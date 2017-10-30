<template lang="pug">

.wrapper
  .containter
    .modal
      imgr.logo(:alt="$t('top.logo')" src='entrance-modal/logo.png' locale)
      imgr.lead(:alt="$t('top.lead')" src='entrance-modal/lead.png' locale)
      router-link(v-bind:to="'/'+$route.params.forest+'/panorama'") ENTER
    router-link.backTop(to="/")
      imgr(:alt="TODO" src='entrance-modal/backtoindex.png' locale global)

</template>

<style lang="sass?indentedSyntax" scoped>

.wrapper
  display: table
  position: absolute
  width: 100%
  height: 100%
  z-index: 9999

.containter
  display: table-cell
  width: 100%
  height: 100%
  vertical-align: middle

img
  user-select: none
  pointer-events: none

.backTop
  color: #fff
  position: absolute
  right: 25px
  top: 50%
  text-decoration: none
  opacity: 0.4
  &:hover
    opacity: 0.8

.modal
  background-color: #000
  padding: 10px
  width: 252px
  height: 558px
  padding: 25px
  border-radius: 20px
  margin-left: auto
  margin-right: auto
  text-align: center
  .logo
    margin-top: 95px
    margin-bottom: 110px
  a
    cursor: pointer
    display: block
    font-family: "Roboto"
    font-size: 15px
    border-radius: 2px
    padding: 20px
    border: 1px solid #3f3f3f
    color: #fff
    text-decoration: none
    letter-spacing: 0.15em
    margin-top: 28px
    transition-duration: 0.2s
    text-align: center
    &:hover
      border-color: #aaa

html[lang=en]
  .modal
    text-align: left
    .logo
      margin-top: 42px
      margin-bottom: 68px

@media (max-width: 660px)
  .backTop
    right: inherit
    top: inherit
    left: 50%
    transform: translateX(-50%)
    margin-top: 30px

</style>
