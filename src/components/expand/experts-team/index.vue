<script lang="tsx">
import BaseVue from "components/BaseVue";
import { Component, Watch } from "vue-property-decorator";

let timer;
@Component({
  name: "RpExpertsTeam"
})
export default class RpExpertsTeam extends BaseVue {
  src = true;
  @Watch("width")
  resize() {
    this.src = false;
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.src = true;
    }, 300);
  }
  render() {
    return this.src ? <iframe style="width:100%;height:100%" src="http://10.1.234.4/zhuanjia/" frameborder="0"></iframe> : "";
  }
}
</script>
