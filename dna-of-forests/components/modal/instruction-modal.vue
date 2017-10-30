<template lang="pug">

.wrapper
  .containter
    .modal
      imgr.icon(alt="Icon" src='instruction-modal/drag-icon.png' global)
      p Drag or Swipe

</template>

<style lang="sass?indentedSyntax" scoped>

.wrapper
  display: table
  position: absolute
  width: 100%
  height: 100%
  z-index: 9999
  pointer-events: none
  user-select: none

.containter
  display: table-cell
  width: 100%
  height: 100%
  vertical-align: middle
  pointer-events: none

.modal
  background-color: rgba(0,0,0,0.9)
  width: 130px
  height: 130px
  border-radius: 20px
  margin-left: auto
  margin-right: auto
  text-align: center
  pointer-events: none

  .icon
    margin-top: 22px
    margin-bottom: 16px
    user-select: none
    pointer-events: none
  p
    font-family: 'Roboto'
    font-weight: normal
    font-size: 12px
    letter-spacing: 0.05em


</style>
