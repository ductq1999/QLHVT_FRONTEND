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
                  placeholder="Nhập biển số"
                  v-model="buses.first"
                />
              </div>
              <div class="form-group col-md-6">
                <label>Điểm cuối</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập Màu Xe"
                  v-model="buses.last"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Độ dài</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập loại bằng lái"
                  v-model="buses.length"
                />
              </div>
              <div class="form-group col-md-6">
                <label>Độ phức tạp</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập đời xe"
                  v-model="buses.complexity"
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
                  <option style="color: black" value="first">Điểm đầu</option>
                  <option style="color: black" value="last">Điểm cuối</option>
                  <option style="color: black" value="length">Độ dài</option>
                  <option style="color: black" value="complexity">
                    Độ phức tạp
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
            <a class="btn btn-primary" @click="getBusesByCondition">
              Tìm kiếm
            </a> -->
          </form>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Điểm đầu</th>
                <th scope="col">Điểm cuối</th>
                <th scope="col">Độ dài</th>
                <th scope="col">Độ phức tạp</th>
                <th scope="col" style="text-align: center">Hành động</th>
              </tr>
            </thead>
            
            <tbody v-if="busesByCondition.length > 0">
              <tr v-for="(buses, index) in busesByCondition" :key="index">
                <td>{{ buses.first }}</td>
                <td>{{ buses.last }}</td>
                <td>{{ buses.length }}</td>
                <td>{{ buses.complexity }}</td>
           
               <td style="text-align: center">
                  <nuxt-link :to="{ path: '/buses/' + buses.id }"
                    ><i class="tim-icons icon-pencil"></i
                  ></nuxt-link>
                  <a style="cursor: pointer" @click="showModal(buses.id)">
                    <i class="tim-icons icon-trash-simple"></i>
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              Không có bản ghi
            </tbody>
          </table>
        </card>
        <!-- <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="pageSize"
        ></b-pagination> -->
      </div>
      <b-modal ref="my-modal" id="modal-scoped">
        <div>Bạn có chắc chắn muốn xóa xe này không?</div>
        <template v-slot:modal-footer="{ cancel }">
          <b-button size="sm" variant="success" @click="deleteBuses(idd)"
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

export default {
  components: {
    "no-ssr": NoSSR,
  },
  data() {
    return {
      idd: null,
      pageSize: 3,
      currentPage: 1,
      buses: {
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
      this.getBusesByCondition();
    },
  },
  computed: {
    ...mapGetters({

      allBuses: "buses/getAllBuses",
    }),
    ...mapState({
      rows: (state) => state.buses.rowBuses,
      busesByCondition: (state) => state.buses.busesByCondition,
    }),
  },
  mounted() {
    // this.getAllBuses();
    this.getBusesByCondition();
  },
  methods: {
    showModal(id) {
      this.$refs["my-modal"].show();
      this.idd = id;
    },

    getBuses() {
      this.$store.dispatch("buses/getBusess");
    },

    formatDate(date) {
      let dateTime = "";
      dateTime =
        date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
      return dateTime;
    },
    async deleteBuses(id) {
      await this.$axios.$delete("buses/deleteById/" + id).then((response) => {
        if (response.code === 200) {
          this.getBusesByCondition();
          this.$refs["my-modal"].hide();
          this.$bvToast.toast(`Xóa tuyến xe thành công!`, {
            title: "Thông báo",
            autoHideDelay: 5000,
            variant: "success",
          });
        } else {
          this.$bvToast.toast(`Xóa tuyến xe thất bại!`, {
            title: "Thông báo",
            autoHideDelay: 5000,
            variant: "danger",
          });
        }
      });
    },

    async getAllBuses() {
      await this.$axios.$get("buses/getAll").then((response) => {
        if (response.code === 200) {
          this.$store.dispatch("buses/getBusess", response);
          console.log("aa", response);
        }
      });
    },

    async getBusesByCondition() {
      await this.$axios
        .$get(
          "buses/getBusesByCondition?" +
            "page=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize +
            "&columnSortName=" +
            this.columnSortName +
            "&asc=" +
            this.asc +
            "&first=" +
            this.buses.first +
            "&last=" +
            this.buses.last +
            "&length=" +
            this.buses.length +
            "&complexity=" +
            this.buses.complexity +
            "&status=" +
            this.buses.status
        )
        .then((response) => {
          if (response.code === 200) {
            this.$store.dispatch("buses/setBusesByConditionAction", response);
            console.log("aa", response);
          }
        });
    },
  },
};
</script>
<style>
.table-transparent {
  background-color: transparent !important;
}
</style>
