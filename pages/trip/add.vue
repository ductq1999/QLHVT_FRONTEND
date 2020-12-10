<template>
  <card>
    <h5 slot="header" class="title">Thêm chuyến xe</h5>
    <form>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Mã chuyến đi</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="trip.code"
            placeholder="Nhập mã chuyến đi"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Giá vé</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="trip.fare"
            placeholder="Nhập giá vé"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="example-date-input" class="col-sm-2 col-form-label">Ngày</label>
        <div class="col-sm-10">
          <input class="form-control" type="date" v-model="trip.date" required />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Số khách</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="trip.guestNumber"
            placeholder="Nhập số khách"
            required
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Chọn tuyến đường</label>
        <select class="col-sm-10 form-control" v-model="trip.buses.id">
          <option
            v-for="(buses, index) in allBuses"
            :key="index"
            style="color: black"
            :value="buses.id"
          >
           {{buses.first}} - {{buses.last}}
          </option>
        </select>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Chọn xe</label>
        <select class="col-sm-10 form-control" v-model="trip.coach.id">
          <option
            v-for="(coach, index) in allCoach"
            :key="index"
            style="color: black"
            :value="coach.id"
          >
            biển số {{ coach.licensePlate }} hãng {{coach.manufacturer}} màu {{coach.color}} {{coach.chair}} chỗ
          </option>
        </select>
      </div>
      <button class="btn btn-primary" @click="addTrip()">Submit</button>
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
      trip: {
        code: null,
        date: null,
        fare: null,
        guestNumber: null,
        status: 1,
        buses: {
          id: null,
        },
        coach: {
          id: null,
        },
      },
      errors: [],
    };
  },
  watch: {},
  computed: {
    ...mapGetters({
      allCoach: "coach/getAllCoach",
      allBuses: "buses/getAllBuses",
    }),
    ...mapState({}),
  },
  mounted() {
    this.getCoach();
    this.getBuses();
  },
  methods: {
    checkForm(e) {
      this.errors = [];
      if (!this.trip.code) {
        this.errors.push("Mã chuyến đi là bắt buộc.");
      }
      if (!this.trip.date) {
        this.errors.push("Ngày là bắt buộc.");
      }
      if (!this.trip.fare) {
        this.errors.push("Giá vé là bắt buộc.");
      }
      if (!this.trip.buses.id) {
        this.errors.push("Tuyến đi là bắt buộc.");
      }
      if (!this.trip.coach.id) {
        this.errors.push("Xe là bắt buộc.");
      }
      if (this.errors && this.errors.length > 0) {
        return false;
      } else {
        return true;
      }
      e.preventDefault();
    },
    async addTrip() {
      if (this.checkForm()) {
        let data = {
          code: this.trip.code,
          status: this.trip.status,
          fare: this.trip.fare,
          buses: {
            id: this.trip.buses.id,
          },
          coach: {
            id: this.trip.coach.id,
          },
          guestNumber: this.trip.guestNumber,
          date: this.trip.date,
        };
        await this.$axios.$post("trip/add", data).then((response) => {
          if (response.code === 200) {
            this.$bvToast.toast(`Thêm thông tin chuyến đi thành công!`, {
              title: "Thông báo",
              autoHideDelay: 5000,
              variant: "success",
            });
          } else if (response.code === 409) {
            this.$bvToast.toast(`Đã tồn tại thông tin chuyến đi hoặc số khách vượt quá quy định!`, {
              title: "Thông báo",
              autoHideDelay: 5000,
              variant: "danger",
            });
          } else {
            this.$bvToast.toast(`Thêm thông tin chuyến đi thất bại!`, {
              title: "Thông báo",
              autoHideDelay: 5000,
              variant: "danger",
            });
          }
        });
      }
    },
    getCoach() {
      this.$store.dispatch("coach/getCoachs");
    },
    getBuses() {
      this.$store.dispatch("buses/getBuses");
    },
  },
};
</script>
