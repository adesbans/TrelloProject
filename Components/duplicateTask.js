/*
 * This file represents the logic to duplicate a task.
 *
 * @author Alex Desbans
 */

Vue.component('duplicate-task', {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            data: trelloDataStore
        }
    },
    methods: {
        duplicateTask(task) {
            this.data.tasks.push(task);
        }
    },
    computed: {

    }, 
    template: `
        <b-button @click="duplicateTask(task)">Duplicate Task</b-button>
    `
});