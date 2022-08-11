$("#add_news").submit(function(event){
    alert("Haber Girişi Başarılı!");
})

$("#update_news").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3000/api/news/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Haber Güncelleme Başarılı!");
    })

})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/news/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Haberi Silmek İstediğinizden Emin Misiniz?")){
            $.ajax(request).done(function(response){
                alert("Haber Silme İşlemi Başarılı!");
                location.reload();
            })
        }

    })
}