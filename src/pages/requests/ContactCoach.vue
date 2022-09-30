<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !email.isValid }">
      <label for="email">Your E-mail</label>
      <input
        id="email"
        type="email"
        v-model.trim="email.value"
        @blur="clearValidity('email')"
      />
      <p v-if="!email.isValid">Enter a valid E-mail.</p>
    </div>

    <div class="form-control" :class="{ invalid: !message.isValid }">
      <label for="message">Your Message</label>
      <textarea
        id="message"
        rows="5"
        v-model.trim="message.value"
        @blur="clearValidity('message')"
      ></textarea>
      <p v-if="!message.isValid">Enter a message.</p>
    </div>

    <div class="action">
      <base-button>Send</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formIsValid: true,

      email: {
        value: '',
        isValid: true,
      },
      message: {
        value: '',
        isValid: true,
      },
    };
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
      if (this.message.value === '') {
        this.message.isValid = false;
        this.formIsValid = false;
      }
    },

    submitForm() {
      this.validateForm();
      
      if (!this.formIsValid) {
        return;
      }
      this.$store.dispatch('requests/contactCoach', {
        email: this.email.value,
        message: this.message.value,
        coachId: this.$route.params.id,
      });
      this.$router.replace('/requests');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
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

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

p {
  color: grey;
}
</style>
