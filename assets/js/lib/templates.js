var templates = {};
templates.photo = '\
<div class="photo-detail-wrapper" data-id="{{id}}">\
    <div class="photo-wrapper">\
        <img class="img-responsive" src="{{getThumb thumbnail_url "w640"}}">\
    </div>\
    <dl class="photo-author clearfix">\
        <dt><img src="{{User.thumbnail_url}}" class="img-responsive"></dt>\
        <dd>\
            <h5><span class="datetime pull-right">{{UTCConvert create_time}}</span> <span class="nickname">{{User.display_name}}</span></h5>\
            <p class="location">{{#if location_desc}}@{{location_desc}}{{/if}}</p>\
        </dd>\
    </dl>\
    <div class="photo-title"><p>{{&title}}{{#each tag_new}}&nbsp;<a href="javascript:void(0);">#{{this}}</a>{{/each}}</p></div>\
    <div class="photo-ops clearfix">\
        <a href="javascript:void(0);" class="op-comment"><span class="glyphicon glyphicon-comment"></span>\
            &nbsp;<span class="num">{{comment_count}}</span></a>\
        <a href="javascript:void(0);" class="op-like" data-like-status="{{is_good}}">\
        {{#isTrue is_good}}<span class="glyphicon glyphicon-heart red"></span>{{else}}<span class="glyphicon glyphicon-heart-empty"></span>{{/isTrue}}\
            &nbsp;<span class="num">{{good_count}}</span>\
        </a>\
        <a href="javascript:void(0);"><span class="glyphicon glyphicon-retweet"></span>&nbsp;&nbsp;{{forward_count}}</a>\
    </div>\
</div>';

templates.likeHeart = '<div class="red photo-like-heart glyphicon glyphicon-heart"></div>';

templates.loading = '<div class="loading">Loading ...</div>';

templates.commentForm = '\
<form role="form" class="form-inline" id="comment-form" onsubmit="return false;">\
    <div class="form-group">\
        <input type="text" class="form-control" name="content" placeholder="我是评论输入框"/>\
    </div>\
    <div class="form-group">\
        <input type="reset" class="btn btn-default" value="取消"/>\
        <input type="submit" class="btn btn-success pull-right" value="发送"/>\
    </div>\
</form>';

templates.comments = '<div class="comments">{{#each list}}<dl class="comment"><dt></dt><dd></dd></dl>{{/each}}</div>';

templates.about = '<div class="about">\
   <h2>导演</h2>\
   <p>@劣头翔-SH</p>\
   <h2>产经</h2>\
   <p>@劣头翔-SH</p>\
   <h2>UI</h2>\
   <p>@劣头翔-SH</p>\
   <h2>美工</h2>\
   <p>@劣头翔-SH</p>\
   <h2>程序</h2>\
   <p>@劣头翔-SH</p>\
</div>';

templates.home = '<div class="user-home-body">\
    <div class="user-home-background">\
        <img src="{{getThumb background_url ""}}" class="img-responsive"/>\
    </div>\
    <div class="user-home-heading">\
        <dl class="user-home-info">\
            <dt><img src="{{thumbnail_url}}" class="avatar img-circle img-responsive" /></dt>\
            <dd>\
                <h5 class="name">{{display_name}} <span class="location">@{{locdesc}}</span></h5>\
                <p class="signature">{{about_me}}</p>\
            </dd>\
        </dl>\
    </div>\
    <div class="user-home-nav">\
        <ul class=""></ul>\
    </div>\
</div>';

templates.thumbs = '<div class="user-home-photos"><ul class="thumbs"></ul></div>';
templates.thumb = '<li><img class="img-responsive" src="{{getThumb thumbnail_url "w240"}}" /></li>';