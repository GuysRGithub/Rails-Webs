import Vue from "vue/dist/vue.esm";
import VueResource from "vue-resource";

Vue.use(VueResource);

document.addEventListener("turbolinks:load", () => {
  Vue.http.headers.common("X-CSRF-Token") = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

  var element = document.getElementById("team-form");

  if (element != null) {
    var id = element.dataset.id;
    var team = JSON.parse(element.dataset.team);
    var user_attributes = JSON.parse(element.dataset.userAttributes);
    user_attributes.forEach(function(user) {
      user._destroy = null;
    });
    team.user_attributes = user_attributes;

    var app = new Vue({
      el: element,
      data: function() {
        return {
          id: id,
          team: team,
          errors: [],
          scrollPosition: null,
        };
      },
      mounted() {
        window.addEventListener("scroll", this.updateScroll);
      },
      methods: {
        updateScroll() {
          this.scrollPosition = window.scrollY;
        },
        addUser: function() {
          this.team.user_attributes.push({
            id: null,
            name: "",
            email: "",
            _destroy: null,
          });
        },
        removeUser: function(index) {
          var user = this.team.user_attributes[index];

          if (user.id == null) {
            this.team.user_attributes.splice(index, 1);
          } else {
            this.team.user_attributes._destroy = "1";
          }
        },
        undoRemove: function(index) {
            this.team.user_attributes[index]._destroy = null
        },

        saveTeam: function() {
            // Create New Team
            if (this.id == null) {
                this.$http.post('/teams', {team: this.team}).then(res => {
                    Turbolinks.visit(`/teams/${res.body.id}`)
                }, res => {
                    console.log(res);
                    if (res.status == 422) {
                        var json = JSON.parse(res.bodyText)
                        this.errors = json["user.email"][0]
                    }
                })

                // Edit Team
            } else {
                this.$http.post(`/teams/${this.id}`, {team: this.team}).then(res => {
                    Turbolinks.visit(`/teams/${res.body.id}`)
                }, res => {
                    console.log(res);
                    
                })
            }
        },
        existingTeam: function() {
            return this.team.id != null
        }
      },
    });
  }
});
