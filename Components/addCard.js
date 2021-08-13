/*
 * This file represents the logic to add a card component.
 *
 * @author Alex Desbans
 */

function makeNewCardData() {
    return { userContent: { name: '', tags: [], comments: [], nameIsEditing: false, tagIsEditing: false, commentIsEditing: false, cardColor: "#e8c9fc", tagColor: '#f02a1c', newComment: "", newTag: "", numComments : 0, dueDate: '2021-01-01', dateIsEditing: false}, isEditing: false };
}

Vue.component('add-card', {
    data () {
        return makeNewCardData();
        
    },
    methods: {
        addCard () {
            // make sure something has been entered into the "form"
            if (this.userContent.name) {
                // copy data just to make sure it is not connected to anything else
                this.$emit('new-card', this.userContent);
                this.resetAddCard(); //reset state of "empty card");
            }
        },
        resetAddCard () {
            Object.assign(this, makeNewCardData());
        }
    },
    computed: {

    }, 
    template: `
        <div class="add-card">
            <!-- conditionally allow new information too be added inline -->
            <div v-if="isEditing">
                <label for="cardName-new">Name:</label>
                <input type="text" id="cardName-new" v-model="userContent.name" />
                <label for="cardTag-new">Tag:</label>
                <!-- allow enter to add item instead of requiring button press -->
                <input type="text" id="cardTag-new" v-model="userContent.tags[0]" />
                <label for="cardComment-new">Comment:</label>
                <!-- allow enter to add item instead of requiring button press -->
                <input type="text" id="cardComment-new" v-model="userContent.comments[0]" />
                <b-button variant="success" @click="addCard()">Add Card</b-button>
                <b-button variant="danger" @click="resetAddCard()">Cancel</b-button>
            </div>
            <b-icon v-else @click="isEditing=true" icon="plus-square"></b-icon>
        </div>
    `
});