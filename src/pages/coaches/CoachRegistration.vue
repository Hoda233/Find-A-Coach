<template>
    <div>
    <section>
        <base-card>
        <h3>Register as a Coach now!</h3>
        <coach-form @saveData="saveData"></coach-form>
    </base-card>
    </section>
</div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue'

export default {
 components:{CoachForm},

 methods:{
    saveData(data){
        this.$store.dispatch('coaches/registerCoach',data);
        this.$router.replace('/coaches');
    },
 },

}
</script>
