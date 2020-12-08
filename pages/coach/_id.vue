<template>
  <card>
    <h5 slot="header" class="title">Edit Coach</h5>
    <form>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Biển số</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="coach.licensePlate"
            placeholder="Nhập biển số"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Màu xe</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="coach.color"
            placeholder="Nhập màu xe"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Hãng sản xuất</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="coach.manufacturer"
            placeholder="Nhập hãng sản xuất"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Đời xe</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="coach.carType"
            placeholder="Nhập  đời xe"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Model</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="coach.model"
            placeholder="Nhập Model"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Số ghế</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="coach.chair"
            placeholder="Nhập số ghế"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Số năm sử dụng</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="coach.yearUsed"
            placeholder="Nhập số năm sử dụng"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="example-date-input" class="col-sm-2 col-form-label"
          >Ngày bảo dưỡng cuối cùng</label
        >
        <div class="col-sm-10">
          <input
            class="form-control"
            type="date"
            v-model="coach.lastMaintenance"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="example-date-input" class="col-sm-2 col-form-label"
          >Ngày bảo dưỡng tiếp theo</label
        >
        <div class="col-sm-10">
          <input
            class="form-control"
            type="date"
            :value="formatDate(nextMaintenance)"
            disabled
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Tổng thu nhập</label>
        <div class="col-sm-10">
          <input
            v-if="totalIncome > 0"
            type="text"
            class="form-control"
            :value="numberWithCommas(totalIncome) + ' VNĐ'"
            placeholder="Nhập tổng thu nhập"
            disabled
          />
           <input
            v-else
            type="text"
            class="form-control"
            :value="'0 VNĐ'"
            placeholder="Nhập tổng thu nhập"
            disabled
          />
        </div>
      </div>
      <div v-if="errors.length">
        <div class="validation-error mb-3" style="color: red">
          <div v-for="(error, index) in errors" :key="index">{{ error }}</div>
        </div>
      </div>
      <button class="btn btn-primary" @click="updateCoach">Submit</button>
    </form>
  </card>
</template>
<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      coach: {
        licensePlate: null,
        color: null,
        manufacturer: null,
        carType: null,
        model: null,
        chair: null,
        yearUsed: null,
        lastMaintenance: null,
        status: null,
      },
      errors: [],
    };
  },
  watch: {},
  computed: {
    ...mapGetters({
      coachById: "coach/getCoachById",
    }),
    ...mapState({
      nextMaintenance: (state) => state.coach.nextMaintenance,
      totalIncome: (state) => state.coach.totalIncome
    }),
  },
  mounted() {
    this.getCoachById();
    this.getNextMaintenance();
    this.getTotalIncome()
  },
  methods: {
    checkForm(e) {
      this.errors = [];
      if (!this.coach.licensePlate) {
        this.errors.push("Biển số là bắt buộc.");
      }
      if (!this.coach.color) {
        this.errors.push("Màu xe là bắt buộc.");
      }
      if (!this.coach.manufacturer) {
        this.errors.push("Hãng sản xuất là bắt buộc.");
      }
      if (!this.coach.carType) {
        this.errors.push("Dời xe là bắt buộc.");
      }
      if (!this.coach.model) {
        this.errors.push("Model là bắt buộc.");
      }
      if (!this.coach.chair) {
        this.errors.push("Số ghế là bắt buộc.");
      }
      if (!this.coach.yearUsed) {
        this.errors.push("Số năm sử dụng là bắt buộc.");
      }
      if (!this.coach.lastMaintenance) {
        this.errors.push("Ngày bảo dưỡng cuối cùng là bắt buộc.");
      }
      if (this.errors && this.errors.length > 0) {
        return false;
      } else {
        return true;
      }
      e.preventDefault();
    },
    async getCoachById() {
      await this.$axios
        .$get("coach/" + this.$route.params.id)
        .then((response) => {
          if (response.code === 200) {
            this.$store.dispatch("coach/setCoachByIdAction", response.data);
            this.coach.licensePlate = this.coachById.licensePlate;
            this.coach.color = this.coachById.color;
            this.coach.manufacturer = this.coachById.manufacturer;
            this.coach.carType = this.coachById.carType;
            this.coach.model = this.coachById.model;
            this.coach.chair = this.coachById.chair;
            this.coach.yearUsed = this.coachById.yearUsed;
            this.coach.lastMaintenance = this.formatDate(
              this.coachById.lastMaintenance
            );
            this.coach.status = this.coachById.status;
          }
        });
    },
    formatDate(date) {
      let dateTime = "";
      dateTime = date.slice(0, 10);
      return dateTime;
    },
    async updateCoach() {
      if (this.checkForm()) {
        let data = {
          id: this.coachById.id,
          licensePlate: this.coach.licensePlate,
          color: this.coach.color,
          manufacturer: this.coach.manufacturer,
          carType: this.coach.carType,
          model: this.coach.model,
          chair: this.coach.chair,
          yearUsed: this.coach.yearUsed,
          lastMaintenance: this.coach.lastMaintenance,
          status: this.coach.status,
        };
        await this.$axios.$put("coach/update", data).then((response) => {
          if (response.code === 200) {
            this.getNextMaintenance();
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
    async getNextMaintenance() {
      await this.$axios
        .$get("coach/getNextMaintenance/" + this.$route.params.id)
        .then((response) => {
          if (response.code === 200) {
            this.$store.dispatch(
              "coach/setNextMaintenanceAction",
              response.data
            );
          }
        });
    },
    async getTotalIncome() {
      await this.$axios
        .$get("coach/getTotalIncome/" + this.$route.params.id)
        .then((response) => {
          if (response.code === 200) {
            this.$store.dispatch("coach/setTotalIncomeAction", response.data);
          }
        });
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>