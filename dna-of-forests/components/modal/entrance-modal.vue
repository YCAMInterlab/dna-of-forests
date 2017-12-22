<template lang="pug">

.wrapper
  .containter
    .modal
      .logo
        imgr(:alt="$t(this.$route.params.forest+'.top.logo')" src='entrance-modal/logo.png' locale)
      imgr.lead(:alt="$t(this.$route.params.forest+'.top.lead')" src='entrance-modal/lead.png' locale)
      router-link(:to="'/'+$route.params.forest+'/panorama'") ENTER
    router-link.backTop(to="/")
      imgr(:alt="$t('panorama.backtoindex')" src='entrance-modal/backtoindex.png' locale global)

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
  text-align: right
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
  display: -webkit-flex
  display: flex
  flex-direction: column
  .logo
    flex: 1
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
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
    .logo
      align-items: flex-start

@media (max-width: 660px)
  .wrapper
    height: calc(100% - 50px)
  .backTop
    right: inherit
    top: inherit
    left: 50%
    transform: translateX(-50%)
    margin-top: 30px

</style>
