/*
 * This represents the reactive data for Trello.
 *
 * @author Alex Desbans
 */

const trelloDataStore = {
    trelloState: {
        
    },
    tasks: [
            {
            title: { text: 'Example Task', isEditing: false },
            taskColor : '#48aad1',
            containsSearchedTitle: true,
            newCard: { userContent: { name: '', tags: [], comments: [], nameIsEditing: false, tagIsEditing: false, commentIsEditing: false, cardColor: "#e8c9fc", tagColor: '#f02a1c', newComment: "", newTag: "", numComments : 0, dueDate: '2021-01-01', dateIsEditing: false}, isEditing: false },
            cards: [
                { name: 'Example Card', nameIsEditing: false, tagIsEditing: false, commentIsEditing: false, tags: ['example tag'], comments: ['example comment'], cardColor: "#e8c9fc", tagColor: "lightcoral", newComment: "", newTag: "", numComments : 0, dueDate: '2021-01-01', dateIsEditing: false }
            ]
        }
    ],
    addCard(index, newCard){
        this.tasks[index].cards.push(newCard);
    }
    //insert most important methods here
};