var app = new Vue({
    el: "#app",
    data() {
        return {
            info: null,
            counter: 0,
            status: [],
            corpus: null,
            host: "http://localhost:8000/entview", // "https://ehrnotes-ask.azurewebsites.net/entview"
            loading: false,
            errored: false,
            show_tip: false
        };
    },
    methods: {
        update_status: function (message) {
            this.loading = true;
            console.log("NEW STATUS -> " + message);
            this.status.push(message);
        },
        nlp: function (message,event) {
            self = this;
            self.update_status("NLP inveoked");
            axios
                .post(self.host,{
                    corpus: self.corpus
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