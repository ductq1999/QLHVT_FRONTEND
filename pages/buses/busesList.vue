<template>
  <div class="row">
    <no-ssr>
      <div class="col-md-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title">Tuyến xe</h4>
          <nuxt-link to="add"
            ><i class="tim-icons icon-simple-add"></i> Thêm tuyến xe</nuxt-link
          >
          <form method="get">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Điểm đầu</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập điểm đầu"
                  v-model="coach.licensePlate"
                />
              </div>
              <div class="form-group col-md-6">
                <label>Điểm cuối</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập điểm cuối"
                  v-model="coach.color"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Độ dài</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập độ dài"
                  v-model="coach.manufacturer"
                />
              </div>
              <div class="form-group col-md-6">
                <label>Độ phức tạp tuyến đường</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập độ phức tạp tuyến đường"
                  v-model="coach.carType"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Sắp xếp theo</label>
                <select class="form-control" v-model="columnSortName">
                  <option style="color: black" value="" selected>
                    Mặc định
                  </option>
                  <option style="color: black" value="licensePlate">
                    Điểm đầu
                  </option>
                  <option style="color: black" value="color">Điểm cuối</option>
                  <option style="color: black" value="manufacturer">
                    Độ dài
                  </option>
                  <option style="color: black" value="carType">
                    Độ phức tạp của tuyến đường
                  </option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label>Thứ tự</label>
                <select class="form-control" v-model="asc">
                  <option style="color: black" value="true" selected>
                    Từ A -> Z
                  </option>
                  <option style="color: black" value="false">Từ Z -> A</option>
                </select>
              </div>
            </div>
            <a class="btn btn-primary" @click="getCoachByCondition">
              Tìm kiếm
            </a>
          </form>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Điểm đầu</th>
                <th scope="col">Điểm cuối</th>
                <th scope="col">Độ dài</th>
                <th scope="col">Độ phức tạp của tuyến đường</th>

                <!-- <th scope="col">Ngày bảo dướng tiếp theo</th> -->
                <th scope="col" style="text-align: center">Hành động</th>
              </tr>
            </thead>
            <tbody v-if="allBuses.length > 0">
              <tr v-for="(buses, index) in allBuses" :key="index">
                <td>{{ buses.first }}</td>
                <td>{{ buses.last }}</td>
                <!-- <td>{{ buses.length }}</td> -->
                <td>{{ buses.complexity }}</td>

                <td style="text-align: center">
                  <nuxt-link :to="{ path: '/coach/' + coach.id }"
                    ><i class="tim-icons icon-pencil"></i
                  ></nuxt-link>
                  <a style="cursor: pointer" @click="showModal(coach.id)">
                    <i class="tim-icons icon-trash-simple"></i>
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              Không có bản ghi
            </tbody>
            <!-- <tbody v-if="coachByCondition.length > 0">
              <tr v-for="(coach, index) in coachByCondition" :key="index">
            
                <td>{{ coach.licensePlate }}</td>
                <td>{{ coach.color }}</td>
                <td>{{ coach.manufacturer }}</td>
                <td>{{ coach.carType }}</td>
                <td>{{ coach.model }}</td>
                <td>{{ coach.chair }}</td>
                <td>{{ coach.yearUsed }}</td>
                <td>{{ formatDate(coach.lastMaintenance) }}</td>
        
                <td style="text-align: center">
                  <nuxt-link :to="{ path: '/coach/' + coach.id }"
                    ><i class="tim-icons icon-pencil"></i
                  ></nuxt-link>
                  <a style="cursor: pointer" @click="showModal(coach.id)">
                    <i class="tim-icons icon-trash-simple"></i>
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              Không có bản ghi
            </tbody> -->
          </table>
        </card>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="pageSize"
        ></b-pagination>
      </div>
      <b-modal ref="my-modal" id="modal-scoped">
        <div>Bạn có chắc chắn muốn xóa tuyến đường này không?</div>
        <template v-slot:modal-footer="{ cancel }">
          <b-button size="sm" variant="success" @click="deleteCoach(idd)"
            >Đồng ý</b-button
          >
          <b-button size="sm" variant="danger" @click="cancel">Hủy bỏ</b-button>
        </template>
      </b-modal>
    </no-ssr>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import NoSSR from "vue-no-ssr";
import coach, { state } from "~/store/modules/coach";
export default {
  components: {
    "no-ssr": NoSSR,
  },
  data() {
    return {
      idd: null,
      pageSize: 3,
      currentPage: 1,
      coach: {
        first: "",
        last: "",
        length: "",
        complexity: "",
        status: 1,
      },
      columnSortName: "",
      asc: "",
    };
  },
  watch: {
    currentPage(val) {
      // when the hash prop changes, this function will be fired.
      this.currentPage = val;
      this.getCoachByCondition();
    },
  },
  computed: {
    ...mapGetters({
      // allDriver: "driver/getAllDriver",
      // allCoach: "coach/getAllCoach",
      allBuses: "buses/getAllBuses",
    }),
    ...mapState({
      rows: (state) => state.coach.rowCoach,
      coachByCondition: (state) => state.coach.coachByCondition,
    }),
  },
  mounted() {

    this.getAllBuses();
  },
  methods: {
    showModal(id) {
      this.$refs["my-modal"].show();
      this.idd = id;
    },
    getCoach() {
      this.$store.dispatch("coach/getCoachs");
    },

    formatDate(date) {
      let dateTime = "";
      dateTime =
        date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
      return dateTime;
    },
    // async deleteCoach(id) {
    //   await this.$axios.$delete("coach/deleteById/" + id).then((response) => {
    //     if (response.code === 200) {
    //       this.getCoachByCondition();
    //       this.$refs["my-modal"].hide();
    //       this.$bvToast.toast(`Xóa tài xe thành công!`, {
    //         title: "Thông báo",
    //         autoHideDelay: 5000,
    //         variant: "success",
    //       });
    //     } else {
    //       this.$bvToast.toast(`Xóa tài xe thất bại!`, {
    //         title: "Thông báo",
    //         autoHideDelay: 5000,
    //         variant: "danger",
    //       });
    //     }
    //   });
    // },

    async getAllBuses() {
      await this.$axios.$get("buses/getAll").then((response) => {
        if (response.code === 200) {
          this.$store.dispatch("buses/getBusess", response);
          console.log("aa", response);
        }
      });
    },

    // async getCoachByCondition() {
    //   await this.$axios
    //     .$get(
    //       "coach/getCoachByCondition?" +
    //         "page=" +
    //         this.currentPage +
    //         "&pageSize=" +
    //         this.pageSize +
    //         "&columnSortName=" +
    //         this.columnSortName +
    //         "&asc=" +
    //         this.asc +
    //         "&licensePlate=" +
    //         this.coach.licensePlate +
    //         "&color=" +
    //         this.coach.color +
    //         "&manufacturer=" +
    //         this.coach.manufacturer +
    //         "&carType=" +
    //         this.coach.carType +
    //         "&model=" +
    //         this.coach.model +
    //         "&chair=" +
    //         this.coach.chair +
    //         "&yearUsed=" +
    //         this.coach.yearUsed +
    //         "&lastMaintenance=" +
    //         this.coach.lastMaintenance +
    //         "&status=" +
    //         this.coach.status
    //     )
    //     .then((response) => {
    //       if (response.code === 200) {
    //         this.$store.dispatch("coach/setCoachByConditionAction", response);
    //         console.log("aa", response);
    //       }
    //     });
    // },
    // async getNextMaintenance(id) {
    //   await this.$axios
    //     .$get("coach/getNextMaintenance/" + id)
    //     .then((response) => {
    //       if (response.code === 200) {
    //         this.$store.dispatch(
    //           "coach/setNextMaintenanceAction",
    //           response.data
    //         );
    //       }
    //     });
    // },
  },
};
</script>
<style>
.table-transparent {
  background-color: transparent !important;
}
</style>
