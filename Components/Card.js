/*
 * This file represents the logic to create a card component.
 *
 * @author Alex Desbans
 */

Vue.component('a-card', {
    props: {
        card: {
            type: Object,
            required: true
        },
        cardId: {
            type: Number,
            required: true
        },
        theTask: {
            type: Object,
            required: true
        }
    },
    methods: {
        pastDueDate (card) {
            let cardsDate = new Date(card.dueDate + "T00:00:00");
            let today = new Date();
            if (cardsDate >= today) {
                return false;
            }
            else {
                return true;
            }
        },
        getNumComments (card) {
            return card.comments.length;
        },
        //delete a card
        deleteCard (task, num) {
            task.cards.splice(num, 1);
        }
    },
    computed: {

    }, 
    template: `
    <div>
        <input type="color" class="colorPicker"  value="#a568ce" v-model="card.cardColor">
        <input type="text" v-if="card.nameIsEditing" v-model="card.name" @keyup.enter="card.nameIsEditing=false" />
        <h4 v-else @dblclick="card.nameIsEditing=true">{{ card.name }} </h4>
        <h6>Number of comments: {{ getNumComments(card) }}</h6>
        <h6 v-if="pastDueDate(card)" id="missed"> Deadline Missed: {{ card.dueDate }} </h6>
        <h6 v-else id="onTime"> Due on: {{ card.dueDate }} </h6>
        <!-- includes tags next to the card's title -->
        <div v-for="(tag, m) in card.tags" :key="m" v-if="card.tags[m] != ''" class="tag"  :style="{color: card.tagColor}"> 
            <input type="text" v-if="card.tagIsEditing" v-model="card.tags[m]" @keyup.enter="card.tagIsEditing=false" />
            <span v-else @dblclick="card.tagIsEditing=true" >{{ tag }}</span>
        </div>
        <ul>
            <!-- loops through and prints each comment -->
            <li  v-for="(comment, k) in card.comments" :key="k">
                <input type="text" v-if="card.commentIsEditing" v-model="card.comments[k]" @keyup.enter="card.commentIsEditing=false" />
                <span v-else @dblclick="card.commentIsEditing=true">{{ comment }}</span>
            </li>
        </ul>
        <a-modal :card-guy="card" :task-guy="theTask"/>
        <!-- this div places a button that is used to remove a card -->
        <div class="remove-card">
            <b-button variant="danger" @click="deleteCard(theTask, cardId)">Delete Card</b-button> 
        </div>
    </div>
    `
});