<template lang="pug">

.wrapper
  .containter
    .modal
      img.logo(:alt="$t('logo')" src='/dna-of-forests/img/entrance-modal/logo.png' srcset='/dna-of-forests/img/entrance-modal/logo@2x.png 2x')
      img.lead(:alt="$t('lead')" src='/dna-of-forests/img/entrance-modal/lead.png' srcset='/dna-of-forests/img/entrance-modal/lead@2x.png 2x')
      router-link(to='/panorama') ENTER

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
    &:hover
      border-color: #aaa


</style>
