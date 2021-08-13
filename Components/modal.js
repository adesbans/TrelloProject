/*
 * This file represents the logic to create a modal component.
 *
 * @author Alex Desbans
 */

Vue.component('a-modal', {
    props: {
        cardGuy: {
            type: Object,
            retuired: true,
        },
        taskGuy: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            globalEdit: {
                // state to keep track of while dragging items around
                dragState: null,
                // likely only makes sense to have one modal editor active at a time
                modalVisible: false,
                editedCard: null,
                editedTask: null
            }
        }
    },
    methods: {
        editWithModal (card, task) {
            // do NOT copy so v-model updates correct values
            this.globalEdit.editedTask = this.taskGuy;
            this.globalEdit.editedCard = this.cardGuy;
            // popup "alert-style" editor
            this.globalEdit.modalVisible = true;
        },
        deleteTag (tags, num) {
            tags.splice(num, 1);
        },
        deleteComment (comments, num, card) {
            comments.splice(num, 1);
            card.numComments--;
        },
        //add a new tag
        addNewTag (tags, newTag, card) {
            tags.push(newTag);
            card.newTag = '';
        },
        //add a new comment
        addNewComment (comments, newComment, card) {
            comments.push(newComment);
            card.newComment = '';
            card.numComments++;
        },
        //used to duplicate a card
        duplicateCard (card, task) {
            task.cards.push(card);
        }
    },
    computed: {

    }, 
    template: `
    <div>
        <b-button size="sm" @click="editWithModal(cardGuy, taskGuy)">Edit Card</b-button>

        <b-modal cancel-disabled v-model="globalEdit.modalVisible">
            <!-- was this displayed at the correct time (is there something to edit?) -->
            <div v-if="globalEdit.editedCard">
                <label for="cardName-modal">Name:</label>
                <b-form-input trim id="cardName-modal" v-model="globalEdit.editedCard.name"></b-form-input>
                <label v-if="globalEdit.editedCard.tags[0]" for="cardTag-modal">Tag(s):</label>
                <!-- this div creates a drop down menu for user to choose tag color -->
                <div v-for="(t, s) in globalEdit.editedCard.tags" :key="s">
                    <b-form-input  trim id="cardTag-modal" v-model="globalEdit.editedCard.tags[s]"></b-form-input>
                    <select v-model="globalEdit.editedCard.tagColor">
                        <option value="">--Please choose an option--</option>
                        <option value="#FF0000">Red</option>
                        <option value="#0000FF">Blue</option>
                        <option value="#FFa500">Orange</option>
                        <option value="#800080">Purple</option>
                        <option value="#008000">Green</option>
                    </select>
                    <b-button variant="danger" @click="deleteTag(globalEdit.editedCard.tags, s)">Delete Tag</b-button>
                </div>
                <!-- edit the comments -->
                <label v-if="globalEdit.editedCard.comments[0]" for="cardComment-modal">Comment(s):</label>
                <div v-for="(a, b) in globalEdit.editedCard.comments" :key="b">
                    <b-form-input  trim id="cardComment-modal" v-model="globalEdit.editedCard.comments[b]"></b-form-input>
                    <b-button variant="danger" @click="deleteComment(globalEdit.editedCard.comments, b, globalEdit.editedCard)">Delete Comment</b-button>
                </div>
                <!-- add a tag -->
                <label for="newTag-modal">Add Tag:</label>
                <b-form-input trim id="newTag-modal" v-model="globalEdit.editedCard.newTag"></b-form-input>
                <b-button variant="success" @click="addNewTag(globalEdit.editedCard.tags, globalEdit.editedCard.newTag, globalEdit.editedCard)">Add Tag</b-button>
                <!-- add a comment -->
                <div>
                    <label for="newComment-modal">Add Comment:</label>
                    <b-form-input trim id="newComment-modal" v-model="globalEdit.editedCard.newComment"></b-form-input>
                    <b-button variant="success" @click="addNewComment(globalEdit.editedCard.comments, globalEdit.editedCard.newComment, globalEdit.editedCard)">Add Comment</b-button>
                </div>
                <input type="date" v-if="globalEdit.editedCard.dateIsEditing" v-model="globalEdit.editedCard.dueDate" @change="globalEdit.editedCard.dateIsEditing=false" />
                <b-button v-if="!globalEdit.editedCard.dateIsEditing"@click="globalEdit.editedCard.dateIsEditing=true">Change Due Date</b-button>
                <b-button @click="duplicateCard(globalEdit.editedCard, globalEdit.editedTask)">Duplicate Card</b-button>
            </div>
        </b-modal>
    </div>
    `
});