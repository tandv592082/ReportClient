<template>
  <div class="vote-page">
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
    <v-card v-if="voteTimeLeft && voteTimeLeft < 0">
      <v-img
        class="white--text align-end"
        height="200px"
        :src="require('../../assets/feedback.jpg')"
      >
        <v-card-title>
          Đánh giá trực nhật ngày
          {{ workData.date | date }}
        </v-card-title>
      </v-img>
      <v-card-subtitle> Ngày {{ workData.date | date }}</v-card-subtitle>

      <v-card-text class="text--primary">
        <p><strong>Học sinh:</strong> {{ workData.users | users }}</p>

        <p><strong>Ghi chú:</strong> {{ workData.description }}</p>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions
        style="
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        "
      >
        <v-textarea
          class="m-1 full-w"
          clearable
          :disabled="loading || isTodayVoted"
          clear-icon="mdi-close-circle"
          v-model="data.description"
          label="Ghi chú đánh giá"
        ></v-textarea>
        <v-rating
          color="warning"
          empty-icon="mdi-star-outline"
          full-icon="mdi-star"
          half-icon="mdi-star-half-full"
          hover
          :readonly="loading || isTodayVoted"
          dense
          length="5"
          size="48"
          v-model="data.vote"
        ></v-rating>
        <div class="mt-4">
          <v-btn
            color="blue"
            :disabled="loading || isTodayVoted"
            :loading="loading"
            class="ma-2 white--text"
            large
            @click="createVote"
          >
            Gửi đánh giá
            <v-icon right dark> mdi-send </v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
    <h1 v-else>
      {{
        workData ? 'Đánh giá hôm nay chưa mở!':  'Hôm nay không có dữ liệu trực nhật để đánh giá!'
      }}
    </h1>
  </div>
</template>

<script>
import { getAllWork } from '@/api/works';
import { createVote } from '@/api/votes';
import { getTodayWork, getVoteOpening } from '@/utils/date';
import { setTodayVoted, isTodayVoted } from '@/utils/base';
import { mapGetters } from 'vuex';

export default {
  name: 'VotePage',
  data() {
    return {
      msg: '',
      success: false,
      snackbar: false,
      voteTimeLeft: null,
      isTodayVoted: false,
      workData: null,
      loading: false,
      data: {
        vote: 5,
        description: 'Các bạn làm rất tốt!',
      },
      now: new Date(Date.now()).toISOString().split('T')[0].split('-').reverse().join('/'),
    };
  },
  filters: {
    date: (d) => d.split('T')[0].split('-').reverse().join('/'),
    users: (u) => u.map((user) => user.name).join(', '),
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
  async created() {
    this.isTodayVoted = isTodayVoted(this.user.id);
    console.log(this.isTodayVoted);
    await this.getCurrentWork();
  },
  methods: {
    async getCurrentWork() {
      try {
        this.loading = false;
        const respone = await getAllWork();
        console.log(respone);
        this.workData = getTodayWork(respone.data);
        console.log(this.workData);
        this.data.work = this.workData?.id;
        this.data.user = this.user.id;
        this.voteTimeLeft = getVoteOpening(this.workData);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async createVote() {
      try {
        this.loading = false;
        console.log(this.data);
        await createVote(this.data);
        this.isTodayVoted = true;
        setTodayVoted(this.user.id);
        this.success = true;
        this.snackbar = true;
        this.msg = 'Đánh giá thành công!';
      } catch (error) {
        console.log(error);
        this.success = false;
        this.snackbar = false;
        this.msg = 'Có lỗi khi đánh giá, Thử lại sau!';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.vote-page {
  height: 100%;
  width: 100%;
}
</style>
