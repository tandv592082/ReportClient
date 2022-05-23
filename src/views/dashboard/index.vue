<template>
  <div>
    <h1 v-if="!data">Không có dữ liệu tuần này!</h1>
    <v-card v-else>
      <v-card-title>
        Bảng phân công trực nhật tuần {{ weekNumber }} ({{ weekStart }} -
        {{ weekEnd }})</v-card-title
      >
      <v-data-table
        item-key="id"
        :items="works"
        :headers="headers"
        class="elevation-1"
        :loading="loading"
        loading-text="Đang tải dữ liệu bảng trực nhật..."
        hide-default-footer
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.votes="{ item }">
          <v-chip :color="getVoteColor(item.votes)" dark>
            {{ item.isWorkNotOpening ? item.votes : 'Đang chờ' }}
          </v-chip>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.isWorkNotOpening="{ item }">
          <v-chip :color="getStatusColor(item.isWorkNotOpening)" dark>
            {{ item.isWorkNotOpening ? 'Đã hoàn thành' : 'Chưa hoàn thành' }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import {
  // eslint-disable-next-line no-unused-vars
  getAllWork,
} from '@/api/works';
import { getWeekWorks } from '@/utils/base';
import { getCurrentWeekNumber, getStartEndWeek } from '@/utils/date';

export default {
  name: 'DashBoardPage',
  data() {
    return {
      data: true,
      loading: false,
      works: [],
      weekStart: getStartEndWeek()[0],
      weekEnd: getStartEndWeek()[1],
      weekNumber: getCurrentWeekNumber(),
      headers: [
        {
          text: 'Thứ',
          align: 'start',
          value: 'day',
        },
        {
          text: 'Ngày trực nhật',
          align: 'start',
          value: 'date',
        },
        {
          text: 'Học sinh',
          align: 'start',
          value: 'users',
        },
        {
          text: 'Ghi chú',
          align: 'start',
          value: 'description',
        },
        {
          text: 'Giờ mở đánh giá',
          align: 'start',
          value: 'expires',
        },
        {
          text: 'Đánh giá',
          align: 'start',
          value: 'votes',
        },
        {
          text: 'Trạng thái',
          align: 'start',
          value: 'isWorkNotOpening',
        },
      ],
    };
  },
  filters: {
    date: (v) => v.split('-').reverse().join('/'),
  },
  async created() {
    await this.getAllWorks();
  },
  methods: {
    getVoteColor(vote) {
      return vote === 'Đang chờ' ? 'orange' : 'green';
    },
    getStatusColor(status) {
      return status ? 'green' : 'orange';
    },
    async getAllWorks() {
      try {
        this.loading = true;
        const respone = await getAllWork();
        const { data } = respone;
        this.works = getWeekWorks(data);
        console.log(this.works);
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
