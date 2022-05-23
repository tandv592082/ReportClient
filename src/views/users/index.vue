<template>
  <div>
    <v-snackbar
      :timeout="2000"
      v-model="snackbar"
      absolute
      centered
      top
      :color="success ? 'green' : 'red'"
    >
      {{ msg }}
    </v-snackbar>
    <h1 v-if="!userData">Không có dữ liệu học sinh!</h1>
    <v-card v-else>
      <v-data-table :headers="headers" :items="userData" sort-by="name" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Danh sách học sinh</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                  Thêm học sinh
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{
                    editedIndex === -1 ? 'Thêm học sinh' : 'Sửa học sinh'
                  }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.name"
                            :rules="nameRules"
                            :disabled="loading"
                            label="Họ tên"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.dateOfBirth"
                                label="Ngày sinh"
                                prepend-icon="mdi-calendar"
                                :disabled="loading"
                                readonly
                                :rules="dobRules"
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.dateOfBirth"
                              @input="menu = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            type="email"
                            :disabled="loading"
                            :rules="emailRules"
                            v-model="editedItem.email"
                            label="Email"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            type="password"
                            :disabled="loading"
                            :rules="
                              editedIndex === -1
                                ? [
                                    (v) => !!v || 'Paassword không được để trống',
                                    (v) => v.length > 3 || 'Mật khẩu ít nhất 3 ký tự',
                                  ]
                                : []
                            "
                            v-model="editedItem.password"
                            label="Mật khẩu"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            :disabled="loading"
                            v-model="editedItem.sex"
                            :items="sex"
                            item-text="text"
                            :rules="[(v) => !!v || 'Chọn giới tính']"
                            item-value="value"
                            label="Giới tính"
                            single-line
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            :disabled="loading"
                            :rules="roomRules"
                            v-model="editedItem.room"
                            label="Lớp"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            :disabled="loading"
                            v-model="editedItem.role"
                            :items="roles"
                            item-text="text"
                            :rules="[(v) => !!v || 'Chọn quyền']"
                            item-value="value"
                            label="Quyền"
                            single-line
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"> Đóng </v-btn>
                  <v-btn :disabled="!valid || loading" color="blue" @click="save"> Lưu </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Bạn muốn xoá học sinh này?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Đóng</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm" :disabled="loading"
                    >Xoá</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import {
  // eslint-disable-next-line no-unused-vars
  getAllUser,
  createUser,
  deleteUser,
  updateUser,
} from '@/api/users';
import { cloneObj } from '@/utils/base';

export default {
  name: 'UsersPage',
  data: () => ({
    valid: true,
    snackbar: false,
    success: false,
    msg: '',
    tableLoading: false,
    userData: [],
    dialog: false,
    dialogDelete: false,
    editedItem: {
      id: '',
      name: '',
      dateOfBirth: null,
      email: '',
      role: '',
      room: '',
      sex: '',
      password: '',
    },
    loading: false,
    e6: [],
    nameRules: [(v) => !!v || 'Tên không được để trống'],
    dobRules: [(v) => !!v || 'Ngày sinh không được bỏ trống'],
    roomRules: [(v) => !!v || 'Lớp không được bỏ trống'],
    emailRules: [
      (v) => !!v || 'Email không được để trống',
      (v) => /.+@.+\..+/.test(v) || 'Email không đúng định dạng',
    ],
    select: null,
    roles: [
      {
        text: 'Người dùng',
        value: 'user',
      },
      {
        text: 'Quản trị viên',
        value: 'admin',
      },
    ],
    sex: [
      {
        text: 'Nam',
        value: 'Nam',
      },
      {
        text: 'Nữ',
        value: 'Nữ',
      },
    ],
    menu: false,
    time: null,
    editedIndex: -1,
    headers: [
      {
        text: 'Họ tên',
        align: 'start',
        value: 'name',
      },
      {
        text: 'Ngày sinh',
        align: 'start',
        value: 'dateOfBirth',
      },
      {
        text: 'Giới tính',
        align: 'start',
        value: 'sex',
      },
      {
        text: 'Lớp',
        align: 'start',
        value: 'room',
      },
      {
        text: 'Email',
        align: 'start',
        value: 'email',
      },
      {
        text: 'Quyền',
        align: 'start',
        value: 'role',
      },
      {
        text: 'Hành động',
        align: 'start',
        value: 'actions',
      },
    ],

  }),
  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
    dialogDelete(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.closeDelete();
    },
  },
  async created() {
    await this.getAllUsers();
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    editItem(item) {
      this.editedIndex = this.userData.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.userData.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await this.deleteUser();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    async getAllUsers() {
      try {
        this.tableLoading = true;
        const respone = await getAllUser();
        this.userData = respone.data.map((u) => {
          const dateOfBirth = u.dateOfBirth.split('T')[0];
          Object.assign(u, { dateOfBirth });
          return u;
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.tableLoading = false;
      }
    },

    async createUser() {
      try {
        this.loading = true;
        const data = cloneObj(this.editedItem);
        delete data.id;
        data.dateOfBirth = new Date(data.dateOfBirth).toISOString();
        await createUser(data);
        this.userData.push(this.editedItem);
        this.snackbar = true;
        this.success = true;
        this.msg = 'Thêm thành công';
        this.close();
      } catch (error) {
        this.snackbar = true;
        this.success = false;
        this.msg = 'Cõ lỗi khi tạo dữ liệu, thử lại sau';
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async updateUser() {
      try {
        this.loading = true;
        const data = cloneObj(this.editedItem);
        const { id } = data;
        delete data.id;
        delete data.works;
        delete data.isEmailVerified;
        data.dateOfBirth = new Date(data.dateOfBirth).toISOString();
        await updateUser(id, data);
        Object.assign(this.userData[this.editedIndex], this.editedItem);
        this.snackbar = true;
        this.success = true;
        this.msg = 'Sửa thành công';
        this.close();
      } catch (error) {
        this.snackbar = true;
        this.success = false;
        this.msg = 'Cõ lỗi khi tạo dữ liệu, thử lại sau';
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteUser() {
      try {
        this.loading = true;
        const data = cloneObj(this.editedItem);
        const { id } = data;
        await deleteUser(id);
        this.userData.splice(this.editedIndex, 1);
        this.snackbar = true;
        this.success = true;
        this.msg = 'Xoá thành công';
        this.closeDelete();
      } catch (error) {
        this.snackbar = true;
        this.success = false;
        this.msg = 'Cõ lỗi khi tạo dữ liệu, thử lại sau';
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async save() {
      if (this.editedIndex > -1) {
        await this.updateUser();
      } else {
        await this.createUser();
      }
      this.validate();
    },
  },
};
</script>

<style></style>
