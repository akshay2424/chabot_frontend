<template>
  <base-nav
    class="navbar-top navbar-dark"
    id="navbar-main"
    :show-toggle-button="false"
    expand
  >
    <form
      class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto"
    >
      <!-- <div class="form-group mb-0">
        <base-input
          placeholder="Search"
          class="input-group-alternative"
          alternative=""
          addon-right-icon="fas fa-search"x`
        >
        </base-input>
      </div> -->
    </form>
    <ul class="navbar-nav align-items-center d-none d-md-flex">
      <li class="nav-item dropdown">
        <base-dropdown class="nav-link pr-0">
          <div class="media align-items-center" slot="title">
            <span class="avatar avatar-sm rounded-circle">
              <img alt="Image placeholder" src="img/theme/team-4-800x800.jpg" />
            </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm font-weight-bold">{{user_name}}</span>
            </div>
          </div>

          <template>
            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-settings-gear-65"></i>
              <span>Settings</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-calendar-grid-58"></i>
              <span>Activity</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-support-16"></i>
              <span>Support</span>
            </router-link>
            <div class="dropdown-divider"></div>
            <router-link @click.native="logout" to="#" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </router-link>
          </template>
        </base-dropdown>
      </li>
    </ul>
  </base-nav>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
      user_name:sessionStorage.getItem("user_name")
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    logout() {
      //we should handle errors in a more scalabe way, but this works for now

      // alert(this.form.email + " " + this.form.password + " " + this.rememberMe);

      axios
        .get("logout", {
          headers: {
            // axios.defaults.headers.common['Access-Control-Allow-Origin'] :  '*'
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data[1] == 200) {
            // console.log(sessionStorage.getItem("loggedIn"));
            // // sessionStorage.setItem("loggedIn", false);
            // // sessionStorage.setItem("jwt_token", "");
            // console.log(sessionStorage.getItem("loggedIn"));

            localStorage.setItem("jwt_token", response.data[0].token)
             localStorage.setItem("loggedIn", false)
            this.$router.push("/login");
          }
          console.log(response.data[0].message);
          console.log(response.status);
          //handle response and save JWT
        })
        .catch((err) => {
          // alert(err);
          if (!err.response) {
            alert("Check your network");
          } else if (err.response.status == 302) {
            sessionStorage.setItem("loggedIn", false);
            sessionStorage.setItem("jwt_token", "");
            console.log(err.response);
            this.$router.push("/login");
          }
        });
    },
  },
};
</script>
