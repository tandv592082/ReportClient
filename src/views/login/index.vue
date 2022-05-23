<template>
  <div class="login-page">
    <v-snackbar
      v-model="snackbar"
      timeout="2000"
      top
      :color="success ? 'success': '#d32f2f'"
    >
      {{ msg }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <h1 class="app-title">PHẦN MỀM QUẢN LÝ TRỰC NHẬT</h1>
    <v-card class="card-login">
      <v-card-title>Đăng nhập</v-card-title>
      <form class="ma-4">
        <v-text-field
          v-model="email"
          :disabled="loading"
          :error-messages="emailErrors"
          :counter="10"
          label="Email"
          error
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          :disabled="loading"
          class="mt-4"
          v-model="password"
          :error-messages="passwordErrors"
          label="Mật khẩu"
          required
          type="password"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>

        <div class="mt-6"></div>
        <v-btn
          :disabled="loading"
          :loading="loading"
          class="ma-2 white--text login-btn"
          color="success"
          @click="submit"
        >
          Đăng nhập<v-icon right> mdi-send </v-icon>
        </v-btn>
      </form>
    </v-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  mixins: [validationMixin],
  name: 'LoginPage',
  validations: {
    email: { required, email },
    password: { required },
  },

  data: () => ({
    password: '',
    email: '',
    loading: false,
    success: false,
    msg: '',
    snackbar: false,
  }),

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      // eslint-disable-next-line no-unused-expressions
      !this.$v.password.required && errors.push('Mật khẩu không được để trống.');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.email.email && errors.push('Email không đúng định dạng');
      // eslint-disable-next-line no-unused-expressions
      !this.$v.email.required && errors.push('Email không được để trống');
      return errors;
    },
  },

  methods: {
    ...mapActions('user', ['login']),
    async submit() {
      try {
        this.$v.$touch();
        if (!this.emailErrors.length && !this.passwordErrors.length) {
          this.loading = true;
          await this.login({ email: this.email, password: this.password });
          this.success = true;
          this.msg = 'Đăng nhập thành công!';
          this.showToast();
        }
      } catch (error) {
        this.msg = error.response.data.message;
        this.success = false;
        this.showToast();
      } finally {
        this.loading = false;
      }
    },
    showToast() {
      this.snackbar = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/login_bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .app-title {
    position: absolute;
    top: 96px;
    color: white;
  }
  .card-login {
    position: relative;
    width: 360px;
    height: 300px;
    padding: 8px 24px;
    .login-btn {
      background: green;
      position: absolute;
      bottom: 16px;
    }
  }
}
</style>
