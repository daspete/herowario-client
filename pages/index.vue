<template>
    <div class="page">
        <!-- <Game /> -->
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {

    data(){
        return {
            
        }
    },

    mounted(){
        const loginObserver = this.$apollo.subscribe({
            query: gql`
                subscription {
                    UserLoggedIn {
                        _id
                        firstname
                    }
                }
            `
        })

        loginObserver.subscribe({
            next(data){
                console.log(data)
            },
            error(err){
                console.log('error', err)
            }
        })
    }
    
}
</script>

<style>

</style>