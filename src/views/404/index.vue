<template>
  <div class="not-found-page">
    <h1>TRANG MÀ BẠN TÌM KIẾM KHÔNG CÓ!</h1>
    <v-btn
      depressed
      color="primary"
      :link="true"
      to="/"
    >
      Về trang chủ
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage',
};
</script>

<style>
.not-found-page  {
  widows: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

</style>
