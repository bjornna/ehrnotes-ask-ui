
var app = new Vue({
    el: "#app",
    data() {
        return {
            info: null,
            counter: 0,
            debouncedInput: null,
            status: [],
            corpus: null,
            //host: "http://localhost:8000/entview",
            host: "https://ehrnotes-ask.azurewebsites.net/entview",
            debug: false,
            loading: false,
            errored: false,
            show_tip: false
        };
    },
    watch: {

        corpus: debounce(function (newVal) {
            this.debouncedInput = newVal;
            this.nlp(this.corpus,null);
        },1000)
    },
    methods: {
        doNLP: function () {
            this.nlp(this.corpus,null);
        },
        update_status: function (message) {

            console.log("NEW STATUS -> " + message);
            this.status.push(message);
        },
        nlp: function (message,event) {
            self = this;
            self.loading = true;
            self.update_status("NLP inveoked");
            axios
                .post(self.host,{
                    corpus: message
                })
                .then(function (response) {
                    self.update_status("Got NLP response");
                    if (response && response.data) {
                        console.log("Got data");
                        console.log(response.data);
                        if (response.data.data) {
                            self.update_status("Response has NLP data ");
                            var result = response.data.data;
                            console.log(result);
                            self.info = result;
                        } else {
                            console.log("No response.data.data");
                            self.update_status("Not NLP data in response");
                        }
                    } else {
                        console.log("No data");
                        console.log(response);
                        self.update_status("No data");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    self.errored = true;
                })
                .finally(() => (self.loading = false));
        }
    },
    mounted() { }
});