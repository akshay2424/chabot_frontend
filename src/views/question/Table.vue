<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ title }}
          </h3>
        </div>
        <div class="col text-right">
          <!-- <router-link to="/topic/create" class="nav-link">
            <base-button type="primary" size="md">Add Question</base-button>
          </router-link> -->
        </div>
      </div>
    </div>

    <div class="table">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="data"
      >
        <template slot="columns">
          <th>Question no</th>
          <th>Question</th>
          <th>Topic</th>
          <th>Answer</th>
        </template>

        <template slot-scope="{ row }">
          <th scope="row">
            <div class="media align-items-center">
              <!-- <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" :src="row.img">
              </a> -->
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.question_no }}</span>
              </div>
            </div>
          </th>
          <td class="budget">
            {{ row.question }}
          </td>
          <td class="budget">
            {{ row.topic_id }}
          </td>
          <td class="budget">
            <a
              class="dropdown-item text-blue name mb-0 text-sm"
              href="#"
              @click="handleAnswer(row._id.$oid)"
            >
              Answers
            </a>
          </td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <base-pagination
        v-model="currentPage"
        :pageCount="(totalItems + 10) / 10"
        @input="getPostData(currentPage)"
      ></base-pagination>
    </div>
  </div>
</template> 
<script>
import axios from "axios";

export default {
  name: "question-table",
  props: {
    type: {
      type: String,
    },
    title: String,
    data: Array,
    totalItems: Number,
  },
  computed: {
    rows() {
      return this.data.length;
    },
  },
  data() {
    return {
      perPage: 10,
      id: "",
      currentPage: 1,
      question_id: "",
    };
  },
  methods: {
    getPostData(currentPage) {
      axios
        .get("question?_page=" + currentPage)
        .then((response) => {
          console.log(response);
          sessionStorage.setItem("jwt_token", response.data[2]);
          this.data = response.data[0];
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    handleAnswer(question_id) {
      this.$router.push({
        name: "answer-list",
        params: { question_id: question_id },
      });
    },
    handleDelete(id) {
      axios
        .delete("question/" + id)
        .then((response) => {
          //   alert(response.data);
          if (response.data[1] == 204) {
            // this.data=response.data[0];
          sessionStorage.setItem("jwt_token", response.data[2]);
            this.$router.back();
            console.log(this.data);
          }
        })
        .catch((err) => {
          // alert(err);
          if (!err.response) {
            alert("Check your network");
          } else if (err.response.status == 302) {
            sessionStorage.setItem("loggedIn", false);
            console.log(err.response);
            this.$router.push("/login");
          }
        });
    },
  },
};
</script>
<style>
</style>
