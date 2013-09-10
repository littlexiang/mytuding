var templates = {
    photo: '\
{{#list}}\
<div class="photo-detail-wrapper">\
    <div class="photo-wrapper">\
        <img class="img-responsive" src="{{url}}">\
        <div class="red photo-like-heart"><span class="glyphicon glyphicon-heart"></span></div>\
    </div>\
    <dl class="photo-author clearfix">\
        <dt><img src="{{User.thumbnail_url}}" class="img-responsive"></dt>\
        <dd>\
            <h5><span class="datetime pull-right">{{UTCConvert create_time}}</span> <span class="nickname">{{User.display_name}}</span></h5>\
        </dd>\
    </dl>\
    <div class="photo-title"><p>{{&title}}&nbsp;{{#each tag_new}}<a href="javascript:void(0);">#{{this}}</a> &nbsp;{{/each}}</p></div>\
    <div class="photo-ops clearfix">\
        <a href="#"><span class="glyphicon glyphicon-comment"></span> {{comment_count}}</a>\
        <a href="javascript:void(0);" class="op-like" data-id="{{id}}" data-like-status="{{is_good}}">\
        {{#isTrue is_good}}<span class="glyphicon glyphicon-heart red"></span>{{else}}<span class="glyphicon glyphicon-heart-empty"></span>{{/isTrue}}\
            <span class="op-num">{{good_count}}</span>\
        </a>\
        <a href="#"><span class="glyphicon glyphicon-retweet"></span> {{forward_count}}</a>\
    </div>\
</div>\
{{/list}}',
    pageIndex: '<div id="page-index"></div>',
    pageLoading: '<div id="page-index-loading" class="loading">Loading ...</div>',
    photoDetail: '\
{{#list}}\
<div class="photo-detail-wrapper">\
    <div class="photo-wrapper"><img class="img-responsive" src="{{url}}"></div>\
    <div class="photo-content-wrapper">\
        <dl class="photo-content clearfix">\
            <dt><img src="{{User.thumbnail_url}}" class="img-responsive"></dt>\
            <dd>\
                <h5><span class="datetime pull-right">{{UTCConvert create_time}}</span> <b>{{User.display_name}}</b></h5>\
                <p>{{&title}}&nbsp;{{#each tag_new}}<a href="#">#{{this}}</a> &nbsp;{{/each}}</p>\
            </dd>\
        </dl>\
        <div class="photo-ops">\
            <div class="btn-group btn-group-sm">\
                <a href="#" class="btn btn-default">喜欢({{good_count}})</a>\
                <a href="#" class="btn btn-default">评论({{comment_count}})</a>\
            </div>\
        </div>\
        <div class="photo-comment-list">\
            {{#Comments.list}}\
            <dl class="comment clearfix">\
                <dt><img src="{{User.thumbnail_url}}" class="img-responsive"></dt>\
                <dd>{{User.display_name}} {{&content}}</dd>\
            </dl>\
            {{/Comments.list}}\
        </div>\
    </div>\
</div>\
{{/list}}',
};