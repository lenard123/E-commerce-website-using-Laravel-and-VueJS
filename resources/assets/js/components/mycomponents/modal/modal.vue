<template>
<div class="modal fade" v-bind:id="id" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        props:['id']
    }
</script>
