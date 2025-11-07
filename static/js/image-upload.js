// JavaScript Document

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('.image-upload-wrap').hide();
      $('.file-upload-image').attr('src', e.target.result);
      $('.file-upload-content').show();
      $('.image-title').html(input.files[0].name);};
    reader.readAsDataURL(input.files[0]);} else {
    removeUpload();}}
function removeUpload() {
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();}
$('.image-upload-wrap').bind('dragover', function () {
        $('.image-upload-wrap').addClass('image-dropping');});
    $('.image-upload-wrap').bind('dragleave', function () {
        $('.image-upload-wrap').removeClass('image-dropping');});
		

function readURL1(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('.image-upload-wrap1').hide();
      $('.file-upload-image1').attr('src', e.target.result);
      $('.file-upload-content1').show();
      $('.image-title1').html(input.files[0].name);};
    reader.readAsDataURL(input.files[0]);} else {
    removeUpload();}}
function removeUpload1() {
  $('.file-upload-input1').replaceWith($('.file-upload-input1').clone());
  $('.file-upload-content1').hide();
  $('.image-upload-wrap1').show();}
$('.image-upload-wrap1').bind('dragover', function () {
        $('.image-upload-wrap1').addClass('image-dropping1');});
    $('.image-upload-wrap1').bind('dragleave', function () {
        $('.image-upload-wrap1').removeClass('image-dropping1');});
		
		
function readURL2(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('.image-upload-wrap2').hide();
      $('.file-upload-image2').attr('src', e.target.result);
      $('.file-upload-content2').show();
      $('.image-title2').html(input.files[0].name);};
    reader.readAsDataURL(input.files[0]);} else {
    removeUpload();}}
function removeUpload2() {
  $('.file-upload-input2').replaceWith($('.file-upload-input2').clone());
  $('.file-upload-content2').hide();
  $('.image-upload-wrap2').show();}
$('.image-upload-wrap2').bind('dragover', function () {
        $('.image-upload-wrap2').addClass('image-dropping2');});
    $('.image-upload-wrap2').bind('dragleave', function () {
        $('.image-upload-wrap2').removeClass('image-dropping2');});
		

function readURL3(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('.image-upload-wrap3').hide();
      $('.file-upload-image3').attr('src', e.target.result);
      $('.file-upload-content3').show();
      $('.image-title3').html(input.files[0].name);};
    reader.readAsDataURL(input.files[0]);} else {
    removeUpload();}}
function removeUpload3() {
  $('.file-upload-input3').replaceWith($('.file-upload-input3').clone());
  $('.file-upload-content3').hide();
  $('.image-upload-wrap3').show();}
$('.image-upload-wrap3').bind('dragover', function () {
        $('.image-upload-wrap3').addClass('image-dropping3');});
    $('.image-upload-wrap3').bind('dragleave', function () {
        $('.image-upload-wrap3').removeClass('image-dropping3');});
		

function readURL4(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('.image-upload-wrap4').hide();
      $('.file-upload-image4').attr('src', e.target.result);
      $('.file-upload-content4').show();
      $('.image-title4').html(input.files[0].name);};
    reader.readAsDataURL(input.files[0]);} else {
    removeUpload();}}
function removeUpload4() {
  $('.file-upload-input4').replaceWith($('.file-upload-input4').clone());
  $('.file-upload-content4').hide();
  $('.image-upload-wrap4').show();}
$('.image-upload-wrap4').bind('dragover', function () {
        $('.image-upload-wrap4').addClass('image-dropping4');});
    $('.image-upload-wrap4').bind('dragleave', function () {
        $('.image-upload-wrap4').removeClass('image-dropping4');});
		
		

function readURL5(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('.image-upload-wrap5').hide();
      $('.file-upload-image5').attr('src', e.target.result);
      $('.file-upload-content5').show();
      $('.image-title5').html(input.files[0].name);};
    reader.readAsDataURL(input.files[0]);} else {
    removeUpload();}}
function removeUpload5() {
  $('.file-upload-input5').replaceWith($('.file-upload-input5').clone());
  $('.file-upload-content5').hide();
  $('.image-upload-wrap5').show();}
$('.image-upload-wrap5').bind('dragover', function () {
        $('.image-upload-wrap5').addClass('image-dropping5');});
    $('.image-upload-wrap5').bind('dragleave', function () {
        $('.image-upload-wrap5').removeClass('image-dropping5');});