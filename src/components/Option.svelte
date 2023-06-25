<script lang="ts">
  import Icon from "@iconify/svelte";
  import { tooltip } from "./tooltip/action";
  import getUniqId from "../utils/getUniqId";

  export let title: string;
  let forEl: string = `field-${getUniqId()}`;
</script>

<div class="mb-1">
  <label class="flex items-center gap-2" for={forEl}>
    {title}
    <span {title} use:tooltip><Icon icon="tabler:info-square-rounded" /></span>
  </label>
  <slot id={forEl} />
</div>
