// https://api.nasa.gov/planetary/apod

function addImage(url){
    var image = $(document.createElement('img')).attr('src',url);
    image.attr('class','image');
    $('.imgContainer').html(image);
}

$(document).keydown((e)=> {
    if(e.which == 13){
        console.log($('#date').val())
        var Inputdate = $('#date').val();

        $.ajax({
            url: 'https://api.nasa.gov/planetary/apod',
            method: 'GET',
            success: (data)=>{
                addImage(data.url);
            },
            data:{
                api_key: 'DEMO_KEY',
                date : Inputdate
            } 
        }).fail(()=>{
            console.log('Error')
        }) 
    }
})