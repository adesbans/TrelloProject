/*
 * Example data to use for Trello testing
 *
 * @author Alex Desbans
 */

 //each task has a title and a list of cards, with each card having a name, set of tags, and set of comments
const tasks = [
    {
    title: { text: 'Example Task', isEditing: false },
        taskColor : '#48aad1',
        containsSearchedTitle: true,
        newCard: { userContent: { name: '', tags: [], comments: [], nameIsEditing: false, tagIsEditing: false, commentIsEditing: false, cardColor: "#e8c9fc", tagColor: '#f02a1c', newComment: "", newTag: "", numComments : 0 }, isEditing: false },
        cards: [
            { name: 'Example Card', nameIsEditing: false, tagIsEditing: false, commentIsEditing: false, tags: ['example tag'], comments: ['example comment'], cardColor: "#e8c9fc", tagColor: "lightcoral", newComment: "", newTag: "", numComments : 0 }
        ]
    }
];
