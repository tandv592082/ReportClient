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
    <h1 v-if="!workData">Không có dữ liệu trực nhật!</h1>
    <v-card v-else>
      <v-data-table :headers="headers" :items="workData" sort-by="name" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Danh sách bảng trực nhật đã tạo</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                  Thêm bảng trực nhật
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{
                    editedIndex === -1 ? 'Thêm bảng trực nhật' : 'Sửa bảng trực nhật'
                  }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-row>
                        <v-col cols="12" sm="6" md="12">
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
                                v-model="editedItem.date"
                                label="Ngày thực hiện"
                                :disabled="loading"
                                readonly
                                :rules="notEmptyDate"
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.date"
                              @input="menu = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="12">
                          <v-select
                            v-model="editedItem.users"
                            :items="userData"
                            item-text="name"
                            item-value="id"
                            :menu-props="{ maxHeight: '400' }"
                            label="Chọn học sinh tham gia"
                            multiple
                            persistent-hint
                            :rules="notEmptyUsers"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-textarea
                            type="text"
                            :disabled="loading"
                            v-model="editedItem.description"
                            label="Ghi chú"
                          ></v-textarea>
                        </v-col>

                        <v-col cols="12" sm="12">
                          <v-menu
                            ref="menu"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="editedItem.expires"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.expires"
                                label="Chọn giờ kết thúc"
                                readonly
                                v-bind="attrs"
                                :rles="notEmptyExpires"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="menu2"
                              v-model="editedItem.expires"
                              full-width
                              @click:minute="$refs.menu.save(editedItem.expires)"
                            ></v-time-picker>
                          </v-menu>
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
                <v-card-title class="text-h5">Bạn muốn xoá dữ liệu này?</v-card-title>
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
        <template v-slot:item.users="{ item }">
          <p v-for="user of filterUser(item.users)" :key="user.id">{{ user.name }}</p>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.description="{ item }">
          <p>{{ item.description ? item.description : '-' }}</p>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.actions="{ item }">
          <!-- <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon> -->
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
  getAllWork,
  createWork,
  deleteWork,
} from '@/api/works';
import { getAllUser } from '@/api/users';

import { cloneObj } from '@/utils/base';
// import { isBeforeNow } from '@/utils/date';

export default {
  name: 'UsersPage',
  data: () => ({
    valid: true,
    snackbar: false,
    success: false,
    msg: '',
    tableLoading: false,
    workData: [],
    dialog: false,
    dialogDelete: false,
    editedItem: {
      id: '',
      date: '',
      users: null,
      description: '',
      expires: '',
    },
    loading: false,
    e6: [],
    notEmptyDate: [(v) => !!v || 'Trường này không được để trống.'],
    notEmptyUsers: [(v) => !!v || 'Trường này không được để trống.'],
    notEmptyExpires: [(v) => !!v || 'Trường này không được để trống.'],
    select: null,
    menu: false,
    menu2: false,
    time: null,
    editedIndex: -1,
    headers: [
      {
        text: 'Ngày mở',
        align: 'start',
        value: 'date',
      },
      {
        text: 'Học sinh tham gia',
        align: 'start',
        value: 'users',
      },
      {
        text: 'Ghi chú',
        align: 'start',
        value: 'description',
      },
      {
        text: 'Giờ hết hạn',
        align: 'start',
        value: 'expires',
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
    await this.getData();
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    editItem(item) {
      this.editedIndex = this.workData.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.workData.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await this.deleteWork();
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

    async getData() {
      try {
        this.tableLoading = true;
        const [users, works] = await Promise.all([getAllUser(), getAllWork()]);
        this.userData = users.data;
        this.workData = works.data
          .map((w) => {
            let wDate = w.date;
            // eslint-disable-next-line prefer-destructuring
            wDate = wDate.split('T')[0];
            Object.assign(w, { date: wDate });
            return w;
          });
      } catch (error) {
        console.log(error);
      } finally {
        this.tableLoading = false;
      }
    },

    async createWork() {
      try {
        this.loading = true;
        const data = cloneObj(this.editedItem);
        delete data.id;
        data.date = new Date(data.date).toISOString();
        await createWork(data);
        this.editedItem.users = this.userData.filter((u) => data.users.includes(u.id));
        this.workData.push(this.editedItem);
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

    // async updateUser() {
    //   try {
    //     this.loading = true;
    //     const data = cloneObj(this.editedItem);
    //     const { id } = data;
    //     delete data.id;
    //     delete data.works;
    //     delete data.isEmailVerified;
    //     data.dateOfBirth = new Date(data.dateOfBirth).toISOString();
    //     await updateUser(id, data);
    //     Object.assign(this.workData[this.editedIndex], this.editedItem);
    //     this.snackbar = true;
    //     this.success = true;
    //     this.msg = 'Sửa thành công';
    //     this.close();
    //   } catch (error) {
    //     this.snackbar = true;
    //     this.success = false;
    //     this.msg = 'Cõ lỗi khi tạo dữ liệu, thử lại sau';
    //     console.log(error);
    //   } finally {
    //     this.loading = false;
    //   }
    // },

    async deleteWork() {
      try {
        this.loading = true;
        const data = cloneObj(this.editedItem);
        const { id } = data;
        await deleteWork(id);
        this.workData.splice(this.editedIndex, 1);
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
        await this.createWork();
      }
      this.validate();
    },

    filterUser(users) {
      return users.map((u) => ({ name: u.name, id: u.id }));
    },
  },
};
</script>

<style></style>
