<template>
  <div class="searchRepositories">
    <h1>Search Repositories</h1>

    <form class="searchForm">
      <div class="searchForm__body">
        <label>
          <div class="searchForm__label">Search Repositor Name</div>
          <div class="searchForm__inputFiled">
            <input
              type="text"
              class="searchForm__inputFiledText"
              v-model="submitData.q"
            />
          </div>
        </label>
      </div>

      <div class="searchForm__footer">
        <button
          type="submit"
          class="searchForm__submit"
          @click.prevent="handleSubmit"
        >
          Submit
        </button>
      </div>
    </form>

    <div class="result">
      <p v-if="isLoading">Loading....</p>
      <ul>
        <li v-for="item in repositories" :key="item.id">
          <a :href="item.html_url" target="_blank">
            {{ item.full_name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getRepositoryFactory } from "../domain/github/api";

export default {
  data() {
    return {
      isLoading: false,
      repositories: [],
      submitData: {
        q: ""
      }
    };
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;

      const getRepository = getRepositoryFactory();

      try {
        const res = await getRepository(this.submitData);
        this.repositories = res.items;

        this.isLoading = false;
      } catch (error) {
        if (!navigator.onLine) {
          window.alert("オフラインです！！");
        }

        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.searchForm {
  max-width: 400px;
  margin: 0 auto;

  &__body {
    text-align: left;
  }

  &__footer {
    margin-top: 20px;
    text-align: right;
  }

  &__label {
    font-weight: bold;
  }

  &__inputFiled {
    margin-top: 10px;
  }

  &__inputFiledText {
    box-sizing: border-box;
    width: 100%;
    padding: 5px 10px;
  }

  &__submit {
    padding: 5px 10px;
    margin-left: auto;
    border: none;
    color: #fff;
    font-size: 1rem;
    background-color: #42b983;
    cursor: pointer;
  }
}

.result {
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
}
</style>
