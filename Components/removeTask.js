/*
 * This file represents the logic to remove a task.
 *
 * @author Alex Desbans
 */

Vue.component('remove-task', {
    props: {
        taskNum: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            data: trelloDataStore
        }
    },
    methods: {
        deleteTask (num) {
            if(this.data.tasks.length == 1) {
                this.data.tasks = [];
            }
            this.data.tasks.splice(num, 1);
        }
    }, 
    template: `
        <div class="remove-task">
            <b-button variant="danger" @click="deleteTask(taskNum)">Delete Task</b-button> 
        </div>
    `
});