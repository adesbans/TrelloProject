/*
 * Trello Part 1 assignment.
 *
 * @author Alex Desbans
 */

// app Vue instance that will manage space on the web page
const app = new Vue({
    //link the div with id "app" to this Vue instance
    el: "#app",

    //this holds all the data for this file
    data () {
        return {
            searchWord:'',
            pageColor: '#82dd82',
            holdTasks: tasks,
            backgroundImage: null,
            URLObject: null,
            pageTitle: 'Trello!',
            editingPageTitle: false,
            myTasks : tasks,
            searchedTasks: [],
            globalEdit: {
                // state to keep track of while dragging items around
                dragState: null,
                // likely only makes sense to have one modal editor active at a time
                modalVisible: false,
                editedCard: null,
                editedTask: null
            },
            newTask : { 
                isEditing: false,
                title: { text: '', isEditing: false },
                containsSearchedTitle: true,
                newCard: { userContent: { name: '', tags: [], comments: [], nameIsEditing: false, tagIsEditing: false, commentIsEditing: false, cardColor: "#e8c9fc", 
                tagColor: 'f02a1c', newComment: "", newTag: "", numComments : 0}, isEditing: false},
                cards: []
                
            }
        };
    },

    //this holds all the methods needed for Trello to work
    methods: {
        startDrag (task, card) {
            this.globalEdit.dragState = { task: task, card: card };
        },
        // add an item to given group by dropping it
        onDrop (task) {
            this.removeLink(this.globalEdit.dragState.task, this.globalEdit.dragState.card);
            this.addCard(task, this.globalEdit.dragState.card);
            this.globalEdit.dragState = null;
        },
        //remove a card
        removeLink (task, card) {
            task.cards.splice(task.cards.indexOf(card), 1);
            
        },
        //use the modal in a card
        editWithModal (card, task) {
            // do NOT copy so v-model updates correct values
            this.globalEdit.editedTask = task;
            this.globalEdit.editedCard = card;
            // popup "alert-style" editor
            this.globalEdit.modalVisible = true;
        },
        //add a card to a task
        addCard (task, card) {
            // make sure something has been entered into the "form"
            if (card.name) {
                // copy data just to make sure it is not connected to anything else
                task.cards.push({ name: card.name, tags: card.tags, comments: card.comments, tagColor: card.tagColor, nameIsEditing: false, tagIsEditing: false, commentIsEditing: false, numComments: 0});
            }
            task.newCard.userContent.name = '';
            task.newCard.userContent.tags = [];
            task.newCard.userContent.comments = [];
            task.newCard.userContent.tagColor = 'rgb(208, 223, 77)';
            task.newCard.cardColor = 'rgb(232, 201, 252)';
            task.newCard.taskColor = 'rgb(72, 170, 209);';
            task.newCard.userContent.nameIsEditing = false;
            task.newCard.userContent.tagIsEditing = false;
            task.newCard.userContent.commentIsEditing = false;
            task.newCard.isEditing = false;
            tagColor= 'rgb(240, 42, 28)'; 
            newComment = "";
            newTag = "";
            numComments = 0;
        },
        //reset new card
        resetAddLink (task) {
            task.newCard.userContent.name = '';
            task.newCard.userContent.tags = [];
            task.newCard.userContent.comments = [];
            task.newCard.userContent.tagColor = 'rgb(208, 223, 77)';
            task.newCard.cardColor = 'rgb(232, 201, 252)';
            task.newCard.taskColor = 'rgb(72, 170, 209);';
            task.newCard.userContent.nameIsEditing = false;
            task.newCard.userContent.tagIsEditing = false;
            task.newCard.userContent.commentIsEditing = false;
            task.newCard.isEditing = false;
        },
        //add a task
        addTask (task) {
            
            this.myTasks.push(task);
            
            this.newTask = { 
                isEditing: false,
                title: { text: '', isEditing: false },
                newCard: { userContent: { name: '', tags: [], comments: [], nameIsEditing: false, tagIsEditing: false, commentIsEditing: false, tagColor: 'rgb(208, 223, 77)', cardColor: "rgb(72, 170, 209)",
                 tagColor: 'rgb(240, 42, 28)', newComment: "", newTag: "", numComments : 0}, isEditing: false},
                 cards: []
                
            }
        },
        //cacnel out of adding a new task
        resetAddTask () {
            this.newTask = { 
                isEditing: false,
                title: { text: '', isEditing: false },
                newCard: { userContent: { name: '', tags: [], comments: [], nameIsEditing: false, tagIsEditing: false, commentIsEditing: false, tagColor: 'rgb(208, 223, 77)'}, isEditing: false},
                cardColor: "rgb(72, 170, 209)",
                cards: [], tagColor: 'rgb(240, 42, 28)', newComment: "", newTag: "", numComments : 0
            }
        },
        //delete a task
        deleteTask (num) {
            this.myTasks.splice(num, 1);
            this.numTasks--;
        },
        //search content by task title
        searchByTaskTitle () {
            this.myTasks.forEach(task => {
                if (task.title.text.includes(this.searchWord)) {
                    this.searchedTasks.push(task);
                }
            });
           this.myTasks = this.searchedTasks;
           this.searchWord = '';
        },
        //search tasks and display those that have cards with search word in their title
        searchByCardTitle () {
            this.myTasks.forEach(task => {
                task.cards.forEach(card => {
                    if (card.name.includes(this.searchWord)) {
                        this.searchedTasks.push(task);
                    }
                })
            });
           this.myTasks = this.searchedTasks;
           this.searchWord = '';
        },
        //search tasks and displays those that have a card with a tag that matches the search word
        searchByTag () {
            this.myTasks.forEach(task => {
                task.cards.forEach(card => {
                    card.tags.forEach(tag => {
                        if (tag.includes(this.searchWord)) {
                            this.searchedTasks.push(task);
                        }
                    })
                })
            });
           this.myTasks = this.searchedTasks;
           this.searchWord = '';
        },
        //search tasks and displays those that have a card with a comment that matches the search word
        searchByComment () {
            this.myTasks.forEach(task => {
                task.cards.forEach(card => {
                    card.comments.forEach(comment => {
                        if (comment.includes(this.searchWord)) {
                            this.searchedTasks.push(task);
                        }
                    })
                })
            });
           this.myTasks = this.searchedTasks;
           this.searchWord = '';
        },
        moveUp (cards, num, card) {
            if (num > 0) {
                cards.splice(num - 1, 0, card);
                cards.splice(num + 1, 1);
            }
        },
        moveDown (cards, num, card) {
            if (num < cards.length - 1) {
                cards.splice(num + 2, 0, card);
                cards.splice(num, 1);
            }
        },
        //clear search results and reset to normal
        clearSearch () {
            this.myTasks = this.holdTasks;
            this.searchedTasks = [];
            
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
        //delete a card
        deleteCard (task, num) {
            task.cards.splice(num, 1);
        },
        //delete a comment
        deleteComment (comments, num, card) {
            comments.splice(num, 1);
            card.numComments--;
        },
        //delete a tag
        deleteTag (tags, num) {
            tags.splice(num, 1);
            
        },
        //used to show the number of tasks on the page
        getNumTasks() {
            return this.myTasks.length;
        }, 
        //used to show the amount of comments in a card
        getNumComments (card) {
            return card.comments.length;
        },
        //used to duplicate a card
        duplicateCard (card, task) {
            task.cards.push(card);
        },
        //used to duplicate a task
        duplicateTask(task) {
            this.myTasks.push(task);
        },
        //attempt for making image for background
        makeURLObject () {
            this.URLObject = URL.createObjectURL(this.backgroundImage);
        }
    },
    
    //this watches for if any variables change, and does something if a variable changes
    watch: {
        
        
    },

});

// mount means connecting Vue app instance with HTML element with given ID to display it on the page
app.$mount('#app');
