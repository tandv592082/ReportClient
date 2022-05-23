<template>
  <div>
    <h1 v-if="!data">Không có dữ liệu tuần này!</h1>
    <v-card v-else class="p-2 pt-5">
      <!-- <v-row class="mb-4 mt-2 ml-2">
        <v-col cols="12" sm="6" md="4">
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
            class="px-4"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateStart"
                label="Chọn ngày bắt đầu"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateStart" @input="menu1 = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateEnd"
                label="Chọn ngày kết thúc"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateEnd" @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="4">
        <v-btn
          :loading="loading"
          :disabled="loading"
          color="info"
          class="white--text"
          @click="loader = 'loading'"
        >
          Lọc
          <v-icon right dark> mdi-magnify </v-icon>
        </v-btn>
        </v-col>
      </v-row> -->
      <v-card-title>
        Bảng thống kê học sinh trực nhật
      </v-card-title>
      <v-data-table
        item-key="id"
        :items="rangeUserData"
        :headers="headers"
        class="elevation-1"
        :loading="loading"
        loading-text="Đang tải dữ liệu bảng trực nhật..."
        hide-default-footer
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.votes="{ item }">
          <v-chip :color="getVoteColor(item.votes)" dark>
            {{ item.votes }}
          </v-chip>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)" dark>
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import {
  // eslint-disable-next-line no-unused-vars
  getAllUser,
} from '@/api/users';
import { filterWorkOfUser } from '@/utils/base';

export default {
  name: 'AnalyticsPage',
  data() {
    return {
      data: true,
      loading: false,
      dateStart: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateEnd: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      userData: [],
      rangeUserData: [],
      menu2: false,
      menu1: false,
      headers: [
        {
          text: 'Họ và tên',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Ngày sinh',
          align: 'start',
          value: 'dateOfBirth',
        },
        {
          text: 'Lớp',
          align: 'start',
          value: 'room',
        },
        {
          text: 'Đánh giá trung bình',
          align: 'start',
          value: 'votes',
        },
        {
          text: 'Số lần trực nhật',
          align: 'start',
          value: 'works',
        },
      ],

    };
  },
  async created() {
    await this.getAllUser();
  },
  methods: {
    getVoteColor(votes) {
      return votes === 'Đang chờ' ? 'orange' : 'green';
    },
    getStatusColor(status) {
      return status === 'Đã hoàn thành' ? 'green' : 'orange';
    },
    async getAllUser() {
      try {
        this.loading = true;
        const respone = await getAllUser();
        this.userData = respone.data.map(filterWorkOfUser);
        this.rangeUserData = this.userData;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
