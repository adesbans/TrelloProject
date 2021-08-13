/*
 * This file represents the logic to add a task component.
 *
 * @author Alex Desbans
 */

function newTaskData() {
    return {
        newTask : { 
            isEditing: false,
            title: { text: '', isEditing: false },
            containsSearchedTitle: true,
            newCard: { userContent: { name: '', tags: [], comments: [], nameIsEditing: false, tagIsEditing: false, commentIsEditing: false, cardColor: "#e8c9fc", 
            tagColor: 'f02a1c', newComment: "", newTag: "", numComments : 0}, isEditing: false},
            cards: []
            
        }
    }
}

Vue.component('add-task', {
    data () {
        return newTaskData();
    },
    methods: {
        addTask () {
            if (this.newTask.title) {
                this.$emit('new-task', this.newTask);
                this.resetAddTask();
            }
        },
        //cacnel out of adding a new task
        resetAddTask () {
            Object.assign(this, newTaskData());
        }
    }, 
    template: `
        <div class="add-task">
            <!-- conditionally allow new information too be added inline -->
            <div v-if="newTask.isEditing">
                <label for="taskName-new">Name:</label>
                <input type="text" id="taskName-new" v-model="newTask.title.text" />
                <b-button variant="success" @click="addTask()">Add Task</b-button>
                <b-button variant="danger" @click="resetAddTask(newTask)">Cancel</b-button>
            </div>
            <b-icon v-else @click="newTask.isEditing=true" icon="plus-square"></b-icon>
        </div>
    `
});

