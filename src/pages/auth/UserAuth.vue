<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occured..."
      @close="handleError"
      ><p>{{ error }}</p></base-dialog
    >
    <base-dialog :show="isLoading" title="Authenticating..."
      ><base-spinner></base-spinner
    ></base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: !email.isValid }">
          <label for="email">E-Mail</label>
          <input
            type="email"
            id="email"
            v-model.trim="email.value"
            @blur="clearValidity('email')"
          />
          <p v-if="!email.isValid">Enter a valid E-mail.</p>
        </div>

        <div class="form-control" :class="{ invalid: !password.isValid }">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model.trim="password.value"
            @blur="clearValidity('password')"
          />
          <p v-if="!password.isValid">
            Please enter a valid password (must be at least 6 characters long).
          </p>
        </div>

        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseDialog from '../../components/UI/BaseDialog.vue';
export default {
  components: { BaseDialog },
  data() {
    return {
      email: {
        value: '',
        isValid: true,
      },
      password: {
        value: '',
        isValid: true,
      },
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },

    validateForm() {
      this.formIsValid = true;

      if (this.email.value === '' || !this.email.value.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.value === '' || this.password.value.length < 6) {
        this.password.isValid = false;
        this.formIsValid = false;
      }
    },

    async submitForm() {
      this.validateForm();

      this.isLoading = true;

      const actionPayload = {
        email: this.email.value,
        password: this.password.value,
      };

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('signup', actionPayload);
        }

        const redirectURL='/'+(this.$route.query.redirect || 'coaches');
        this.$router.replace(redirectURL);

      } catch (error) {
        this.error = error.message || 'Failed to authenticate, Try Later!';
      }

      this.isLoading = false;
    },

    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },

    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

p {
  color: grey;
}
</style>
