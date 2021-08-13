/*
 * Logic for Trello program.
 *
 * @author Alex Desbans
 */

const app = new Vue({
    data () {
        return {
            trelloData: trelloDataStore,
            pageTitle: 'Trello!',
            searchTerms: '',
            searchOptions: {
                // which TEXT fields to use in the search, use . to show nesting
                // NOTE, search results are grouped in order given here
                keys: ['trelloDataStore.tasks.title'],
                // report exactly which fields and which characters signaled the match
                includeMatches: true,
                // 0 is an exact match up to 1 is very loose match
                threshold: 0.3
            },
            filteredLinks: [],
            editingPageTitle: false,
            pageColor: '#82dd82'
        }
    },
    methods: {
        addNewCard(num, newCard){
            this.trelloData.addCard(num, newCard);
        },
        addNewTask(task){
            this.trelloData.tasks.push(task);
        },
        getNumTasks() {
            return this.trelloData.tasks.length;
        },
        handleSearchResults (results) {
            // getting individual items that matched can be tricky so factor it out
            function getLinks (group) {
                // result matched part of the group so return just those items
                if (group.matches[0].refIndex != null) {
                    // NOTE, search returns found items in reverses order, so reverse back before displaying
                    links = group.matches.reverse()
                                        // get individual matching items
                                         .map(match => group.item.links[match.refIndex]);
                    return [ ... new Set(links) ];
                }
                // result matched title so return entire group
                else {
                    return group.item.links;
                }
            }

            console.log(results);
            // search actually took place and checked for specific results
            if (results.some(group => group.matches)) {
                console.log(results.map(group => group.matches?.map(match => match.value)));
                // make a copy so ORIGINAL data is not lost
                this.filteredLinks = results.map(group => {
                    return {
                        // add in search field ITEM so it matches simple results for template
                        item: {
                            // copy extra data not effected by search
                            title: group.item.title,
                            // get exact matches as much as possible rather than just accepting outer item as match
                            links: getLinks(group)
                        }
                    };
                });
            }
            // search was initialized or cleared, so return all data
            else {
                this.filteredLinks = results;
            }
        }
    },
    // display game here as a template, so it looks more like a component (perhaps makes it easier to find things)
    template: `
        <div :style="{backgroundColor: pageColor}">
            <input type="color" class="colorPicker"  value="#82dd82" v-model="pageColor">
            <input type="text" v-if="editingPageTitle" v-model="pageTitle" @keyup.enter="editingPageTitle=false" />
            <h1 v-else @dblclick="editingPageTitle=true">{{ pageTitle }}</h1>
            <h3>Number of Tasks: {{getNumTasks()}}</h3>
            <vue-fuse
                placeholder="Search by task title ..."
                :list="trelloData.tasks"
                :search="searchTerms"
                :fuse-opts="searchOptions"
                @fuse-results="handleSearchResults"
            />
            <draggable
            @start="dragging = true"
            @end="dragging = false"

            >
                <a-task 
                    v-for="(currentTask, i) in trelloData.tasks" 
                    :key="i"
                    class="task" 
                    :style="{backgroundColor: currentTask.taskColor}"
                    :task = "currentTask"
                    :task-id = "i"
                    :task-title="currentTask.title"
                    @new-card="addNewCard"
                    
                />
            </draggable>
            <add-task @new-task="addNewTask"/>
            <footer id="footer">
                <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a>
            </footer>
        </div>
    `
});

// connect Vue app instance with HTML element to display it on the page
app.$mount('#app');