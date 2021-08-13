/*
 * This file represents the logic to create a task component.
 *
 * @author Alex Desbans
 */

Vue.component('a-task', {
    
    props: {
        task: {
            type: Object,
            required: true
        },
        taskId: {
            type: Number,
            required: true
        },
        taskTitle: {
            type: Object,
            required: true
        }
    },
    methods: {
        addCard(newCard){
            this.$emit('new-card', this.taskId, newCard)
        }
    },
    watch: {

    }, 
    template: `
    <div>
        <input type="color" class="colorPicker"  value="#48aad1" v-model="task.taskColor">
        <input type="text" v-if="task.title.isEditing" v-model="task.title.text" @keyup.enter="task.title.isEditing=false" />
        <h3 v-else @dblclick="task.title.isEditing=true">{{ task.title.text }}</h3>
        <draggable
        @start="dragging = true"
        @end="dragging = false"
        >
            <a-card v-for="(currentCard, j) in task.cards" 
                :key="j" 
                class="card" 
                :card = "currentCard"
                :card-id = "j"
                :the-task = "task"
                :style="{backgroundColor: currentCard.cardColor}"
            />
        </draggable>
        <add-card @new-card="addCard"/>
        <duplicate-task :task="this.task"/>
        <remove-task :task-num="this.taskId"/>
    </div>
    `
});