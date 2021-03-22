'user strict';

function Images(image_url,title,description,keyword,horns){
    this.image_url= image_url;
    this.title= title;
    this.description= description;
    this.keyword= keyword;
    this.horns= horns;
}
Images.prototype.render = function(){
    let photoSection =$('#photo-template').clone();
    $('main').append(photoSection);
    photoSection.find('h2').text(this.title);
    photoSection.find('img').attr('src',this.image_url);
    photoSection.find('p').text(this.description);
    $('select').append(`<option value='${this.keyword}'>${this.keyword}</option>`);
    
   
  
    photoSection.removeAttr('id');

}
Images.prototype.selected = function () {
    let photoSection =$('#photo-template').clone();
    $('main').append(photoSection);
    photoSection.find('h2').text(this.title);
    photoSection.find('img').attr('src',this.image_url);
    photoSection.find('p').text(this.description);
    $('select').append(`<option value='${this.keyword}'>${this.keyword}</option>`);
    
    
    photoSection.removeAttr('id');
   
};
$('select').change(function () {
    let keyWords = $('select option:selected').val();
    if (keyWords === 'default') {
        
        $('section').attr('id','photo-template');
        getImagesData();
    } else {
        
       
        $('section').attr('id','photo-template');
        geteveryThingDataByKey(keyWords);
        
    }
});

function geteveryThingDataByKey(key) {

    const ajaxSetting = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('data/page-1.json', ajaxSetting).then(data => {
        let ObjeverThing;
        data.forEach(item => {
            if(item.keyword===key){
                ObjeverThing = new Images( item.image_url,item.title,item.description, item.keyword,item.horns);
                
                ObjeverThing .selected();
            }

        });
    });
}


function getImagesData(){
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }
    console.log("json")
    
    $.ajax('data/page-1.json', ajaxSettings).then(data=> {
        
        data.forEach(element=> {
            let imgObj = new Images(element.image_url,element.title,element.description,element.keyword,element.horns);
            imgObj.render();
            
        })
})
}

$('document').ready(getImagesData);