var templates = {
    photos: '{{#list}}\
<div class="photo-detail-wrapper" data-id="{{id}}">\
    <div class="photo-wrapper">\
        <img class="img-responsive" src="{{url}}">\
    </div>\
    <dl class="photo-author clearfix">\
        <dt><img src="{{User.thumbnail_url}}" class="img-responsive"></dt>\
        <dd>\
            <h5><span class="datetime pull-right">{{UTCConvert create_time}}</span> <span class="nickname">{{User.display_name}}</span></h5>\
        </dd>\
    </dl>\
    <div class="photo-title"><p>{{&title}}{{#each tag_new}}&nbsp;<a href="javascript:void(0);">#{{this}}</a>{{/each}}</p></div>\
    <div class="photo-ops clearfix">\
        <a href="javascript:void(0);" class="op-comment"><span class="glyphicon glyphicon-comment"></span>&nbsp;&nbsp;{{comment_count}}</a>\
        <a href="javascript:void(0);" class="op-like" data-like-status="{{is_good}}">\
        {{#isTrue is_good}}<span class="glyphicon glyphicon-heart red"></span>{{else}}<span class="glyphicon glyphicon-heart-empty"></span>{{/isTrue}}\
            &nbsp;<span class="op-like-num">{{good_count}}</span>\
        </a>\
        <a href="javascript:void(0);"><span class="glyphicon glyphicon-retweet"></span>&nbsp;&nbsp;{{forward_count}}</a>\
    </div>\
</div>\
{{/list}}',
    likeHeart: '<div class="red photo-like-heart"><span class="glyphicon glyphicon-heart"></span></div>',
    loading: '<div class="loading">Loading ...</div>',
    commentForm: '<form role="form" class="photo-comment-form form-inline clearfix">\
        <div class="form-group col-lg-12">\
        <input type="text" class="form-control"/>\
        </div>\
    </div>',
    comments: '<div class="comments">{{#each list}}<dl class="comment"><dt></dt><dd></dd></dl>{{/each}}</div>'
};