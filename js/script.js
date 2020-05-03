var inputs = document.querySelectorAll( '.inputfile' );
Array.prototype.forEach.call( inputs, function( input )
{
    var label    = document.getElementById("label"),
        labelVal = label.innerHTML;

    input.addEventListener( 'change', function( e )
    {
        var fileName = '';

        if( this.files && this.files.length > 1 ){
            fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
        }else{
            fileName = e.target.value.split( '\\' ).pop();
        }

        if( fileName ){
            label.innerHTML = "";
            label.append(fileName);
            var extension = fileName.split('.').pop().toLowerCase();
            if(jQuery.inArray(extension, ['gif','png','jpg','jpeg']) == -1){
                $("#image-file").attr("src", "");
                $('#non-image-file').show();
                $('#image-file').hide();
            }else{
                $("#image-file").attr("src", URL.createObjectURL(event.target.files[0]));
                
                $('#image-file').show();
                $('#non-image-file').hide();

                console.log("width : " + $('#image-file').width());
                console.log("height : " + $('#image-file').height());
            }
        }else{
            label.append(labelVal);
        }

    });
});

var _URL = window.URL || window.webkitURL;
$("#image_file").change(function(e) {
    var image, file;
    if ((file = this.files[0])) {
        // var width = ""; 
        // var height = "";
        image = new Image();
        image.onload = function() {
            var width = this.width;
            var height = this.height;
            console.log("width : " + width);
            console.log("height : " + height);
            if (this.width > this.height) {
                $('#image-file').css({
                    "height" : "100%",
                    "width" : "auto"
                });
                $('.file').css({
                    "overflow-x": "auto",
                    "overflow-y": "hidden"
                });
            }
            if (this.height > this.width){
                $('#image-file').css({
                    "width" : "100%",
                    "height" : "auto"
                });
                $('.file').css({
                    "overflow-x": "hidden",
                    "overflow-y": "auto"
                });
            }
        };
        image.src = _URL.createObjectURL(file);
    }
});

$('#submit_form').on('submit', function(event){

    e.preventDefault();
    if(image_file == ''){
        alert("Pilih gambar terlebih dahulu");
        return false;
    }else{
        var extension = $('#output').val().split('.').pop().toLowerCase();
        if(jQuery.inArray(extension, ['gif','png','jpg','jpeg']) == -1){
            alert("Maaf, bukan file gambar");
            $('#output').val('');
            return false;
        }else{
            $.ajax({  
                url         :"ajax/ajax_upload.php",  
                method      :"POST",  
                data        :new FormData(this),  
                contentType :false,  
                processData :false,  
                success     :function(data){
                    if (data == "berhasil") {
                        swal({
                            title: "Gambar berhasil diubah",
                            text: "Halaman akan dimuat ulang...",
                            timer: 2000,
                            showConfirmButton: false
                        });
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    }else{
                        alert("Gagal mengubah gambar, silahkan coba sesaat lagi");
                    }
                }  
            })
        }
    }            
});

$('#image-file').on('click', function() {
    $('.imagepreview').attr('src', $(this).attr('src'));
    // alert($(this).attr('src'));
    $('.imagemodal').show();
});

categoryName();
function categoryName(){
    $.ajax({
        method  : "POST",
        url     : "ajax/ajax_upload.php",
        data    : { type     : "categoryName" },
        success : function(data){
            $('.menu ul').prepend(data);
        }
    });
}
$('.box').click(function() {
    $('.category-list').toggleClass('open');

    $('.category-name').on('click', function() {
        alert($(this).attr("class"));
    });
});

$('#test').keyup(function(e) {
    // console.log($('#test').val());
    if(e.which == 13 || e.which == 188) {
        var tag = $('#test').val();
        // var txt2 = $("<p></p>").text(tag).attr();
        jQuery('<div/>', {
            class   : 'tag-value',
            id      : tag,
            text    : tag
        }).appendTo('#tag-list');

        jQuery('<i/>', {
            class   : 'material-icons',
            id      : 'remove-tag',
            text    : 'close',
            onclick : 'removeTag(' + tag + ')'
        }).appendTo('#' + tag);

        // $('#tag-list').append(tag);
        $('#test').val("");
    }
});

function removeTag(tag){
    var tag = $(tag);
    tag.hide();
}