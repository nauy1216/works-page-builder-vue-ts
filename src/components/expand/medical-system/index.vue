<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component } from "vue-property-decorator";

@Component({
  name: "RpMedicalSystem"
})
export default class RpMedicalSystem extends BaseVue<Record<string, any>> {
  get slideWidth() {
    return this.width;
  }

  get slideHeight() {
    return this.height;
  }
  render() {
    return (
      <div class="rp-medical-system" style={{ width: this.width + "px", height: this.height + "px" }}>
        {this.componentData.list.map(item => {
          return (
            <div class="care-box" key={item.id}>
              <img src={item.img} alt="" />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@include b(medical-system) {
  display: flex;
  .care-box {
    flex: 1;
    padding: 0 10px;
    text-align: center;
    img {
      width: 45%;
      height: 50%;
      display: block;
      margin: 0 auto;
    }
    p {
      font-size: 12px;
      margin-top: 10px;
      color: #fff;
    }
  }
}
</style>
