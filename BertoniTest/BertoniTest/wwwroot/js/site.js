// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(() => {
    //carga de albumes
    $("#contenedorPhotos").hide();
    $("#contenedorComentarios").hide();
    $.get("http://jsonplaceholder.typicode.com/albums", data => {
        var ddlAlbum = $("#ddlAlbumes");
        var btnAlbumes = $("#btnAlbumes");

        ddlAlbum.empty();
        for (let album of data) {
            ddlAlbum.append(`<a class='dropdown-item' data-id='${album.id}'>${album.title}</a>`);
        }
        ddlAlbum.find("a").click(e => {
            btnAlbumes.val($(e.target).attr("data-id"));
            btnAlbumes.text($(e.target).text());
        });
    });
    //definicion de boton de carga
    $(btnAlbumes).click(e => {
        $("#contenedorPhotos").show();
        let idAlbum = $(e.target).val();
        $("#AlbumTitle").text($(e.target).text());
        var divPhotos = $("#photos");
        $.get(`http://jsonplaceholder.typicode.com/albums/${idAlbum}/photos`, data => {
            divPhotos.empty();
            for (let photo of data) {
                divPhotos.append(`<tr>
<td>${photo.albumId}</td>
<td>${photo.id}</td>
<td>${photo.title}</td>
<td>${photo.url}</td>
<td>${photo.thumbnailUrl}</td>
<td><img src='${photo.thumbnailUrl}'/></td>
<td><button value='${photo.id}' name='comentario' class='btn btn-primary'>Ver Comentario</button></td>
                    <tr>`)
            }
        }).done(() => {
            $("[name='comentario']").click(e => {
                $("#contenedorComentarios").show();

                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#contenedorComentarios").offset().top
                }, 2000);

                var id = $(e.target).val();
                $.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, data => {
                    var comentarios = $("#comentarios");
                    comentarios.empty();
                    for (let comentario of data) {
                        comentarios.append(`<tr>
<td>${comentario.postId}</td>
<td>${comentario.id}</td>
<td>${comentario.name}</td>
<td>${comentario.email}</td>
<td>${comentario.body}</td>
</tr>`);
                    }
                });
            });
        });
    });
    //repite boton
    $("#AlbumView").click(() => {
        $("#btnAlbumes").click();
    });
});