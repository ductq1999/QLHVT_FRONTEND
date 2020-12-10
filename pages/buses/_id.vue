<template>
  <card>
    <h5 slot="header" class="title">Sửa tuyến xe</h5>
    <form>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Điểm đầu</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="buses.first"
            placeholder="Nhập điểm đầu"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Điểm cuối</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="buses.last"
            placeholder="Nhập điểm cuối"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Độ dài</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="buses.length"
            placeholder="Nhập độ dài"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Độ phức tạp</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="buses.complexity"
            placeholder="Nhập độ phức tạp"
            required
          />
        </div>
      </div>
      <div v-if="errors.length">
        <div class="validation-error mb-3" style="color: red">
          <div v-for="(error, index) in errors" :key="index">{{ error }}</div>
        </div>
      </div>
      <button class="btn btn-primary" @click="updateBuses">Submit</button>
    </form>
  </card>
</template>
<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      buses: {
        first: null,
        last: null,
        length: null,
        complexity: null,
        status: 1,
      },
      errors: [],
    };
  },
  watch: {},
  computed: {
    ...mapGetters({
      busesById: "buses/getBusesById",
    }),
    ...mapState({}),
  },
  mounted() {
    this.getBusesById();
  },
  methods: {
    checkForm(e) {
      this.errors = [];
      if (!this.buses.first) {
        this.errors.push("Điểm đầu là bắt buộc.");
      }
      if (!this.buses.last) {
        this.errors.push("Điểm cuối là bắt buộc.");
      }
      if (!this.buses.length) {
        this.errors.push("Độ dài là bắt buộc.");
      }
      if (!this.buses.complexity) {
        this.errors.push("Độ phức tạp là bắt buộc.");
      }
      if (this.errors && this.errors.length > 0) {
        return false;
      } else {
        return true;
      }
      e.preventDefault();
    },
    async getBusesById() {
      await this.$axios
        .$get("buses/" + this.$route.params.id)
        .then((response) => {
          if (response.code === 200) {
            this.$store.dispatch("buses/setBusesByIdAction", response.data);
            this.buses.first = this.busesById.first;
            this.buses.last = this.busesById.last;
            this.buses.length = this.busesById.length;
            this.buses.complexity = this.busesById.complexity;
            this.buses.status = this.busesById.status;
          }
        });
    },
    formatDate(date) {
      let dateTime = "";
      dateTime = date.slice(0, 10);
      return dateTime;
    },
    async updateBuses() {
      if (this.checkForm()) {
        let data = {
          id: this.busesById.id,
          first: this.buses.first,
          last: this.buses.last,
          length: this.buses.length,
          complexity: this.buses.complexity,
          status: this.buses.status,
        };
        await this.$axios.$put("buses/update", data).then((response) => {
          if (response.code === 200) {
            this.$bvToast.toast(`Cập nhật thông tin xe thành công!`, {
              title: "Thông báo",
              autoHideDelay: 5000,
              variant: "success",
            });
          } else {
            this.$bvToast.toast(`Cập nhật thông tin xe thất bại!`, {
              title: "Thông báo",
              autoHideDelay: 5000,
              variant: "danger",
            });
          }
        });
      }
    },
  },
};
</script>