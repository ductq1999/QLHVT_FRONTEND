<template>
  <card>
    <h5 slot="header" class="title">Add Buses</h5>
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
    
      <button class="btn btn-primary" @click="addBuses">Submit</button>
      <div v-if="errors.length">
        <div class="validation-error mb-3" style="color: red">
          <div v-for="(error, index) in errors" :key="index">{{ error }}</div>
        </div>
      </div>
    </form>
  </card>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      buses: {
        first: "",
        last: "",
        length: "",
        complexity: "",
        status: 1,
      },
      errors: [],
    };
  },
  watch: {},
  computed: {
    ...mapGetters({}),
    ...mapState({}),
  },
  mounted() {},
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
        this.errors.push("Dộ dài là bắt buộc.");
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
    async addBuses() {
      if (this.checkForm()) {
        let data = {
          first: this.buses.first,
          last: this.buses.last,
          length: this.buses.length,
          complexity: this.buses.complexity, 
          status: this.buses.status,
        };
        await this.$axios.$post("buses/add", data).then((response) => {
          if (response.code === 200) {
            this.$bvToast.toast(`Thêm thông tin tuyến xe thành công!`, {
              title: "Thông báo",
              autoHideDelay: 5000,
              variant: "success",
            });
          } else if (response.code === 409) {
            this.$bvToast.toast(`Đã tồn tại thông tin tuyến xe xe!`, {
              title: "Thông báo",
              autoHideDelay: 5000,
              variant: "danger",
            });
          } else {
            this.$bvToast.toast(`Thêm thông tin tuyến xe thất bại!`, {
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