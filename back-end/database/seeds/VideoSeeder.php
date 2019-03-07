<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	DB::table('video')->insert([[
    		'id'     => '1',
    		'source_link'     => 'https://www.facebook.com/khanhit197/videos/vb.100003701072765/1460270287439660',
    		'source_name' => 'facebook',
    		'max_qualify' => '1080',
    		'duration' => '',
    		'link_play' => '[{"src":"https:\/\/video.xx.fbcdn.net\/v\/t42.9040-2\/10000000_582530295518313_560866572160204800_n.mp4?_nc_cat=101&efg=eyJybHIiOjE1MDAsInJsYSI6NDA5NiwidmVuY29kZV90YWciOiJwcmVtdXRlX3N2ZV9oZCJ9&_nc_oc=AQkAgAyabQNCYKWyEoisJhb3eX7OUxmc0Is-7vvzlTW9dcNBwQBsoJMkya_BaRy2FEU&rl=1500&vabr=967&_nc_ht=video.xx&oh=9b670712f2b6b5b16c358b1eacd306b3&oe=5C78B448","thumbnail":"https:\/\/scontent.xx.fbcdn.net\/v\/t15.5256-10\/p168x128\/48575492_1460323204101035_5539462189166886912_n.jpg?_nc_cat=108&_nc_oc=AQmrByA_hm1ISlC0NJ1pX5do0Y-_Tfcgc4HPqGuSfaPewO0EyujWJCpNrIEA4oNy5JU&_nc_ad=z-m&_nc_cid=0&_nc_zor=9&_nc_ht=scontent.xx&oh=2a4770a9c60b1898688462ae50989f16&oe=5CE58FAD","duration":6122.821}]',
    		'ad_id' => 1,
    	],[
    		'id'     => '2',
    		'source_link'     => 'https://drive.google.com/file/d/1S35lOSgyG55egvg1_8WQaskST7-Bdp6b/view?usp=sharing',
    		'source_name' => 'google',
    		'max_qualify' => '1080',
    		'duration' => '',
    		'link_play' => '[{"qualify":"1080p","src":"https:\/\/redirector.googlevideo.com\/videoplayback?expire=1551276322&ei=4mB2XMLVHYXWugKi0axI&ip=118.69.66.168&cp=QVNKU0NfVVNQQ1hOOndia3hJamR2RHBUNG5aWUt3czl5UjhkZUJsNDJGaDF2M0JnZi14dm9tWFA&id=e9c23dbe6b447244&itag=37&source=webdrive&requiressl=yes&mm=30&mn=sn-i3belnez&ms=nxu&mv=m&pl=24&ttl=transient&susc=dr","type":"video\/mp4","duration":"5326.378"},{"qualify":"720p","src":"https:\/\/redirector.googlevideo.com\/videoplayback?expire=1551276322&ei=4mB2XMLVHYXWugKi0axI&ip=118.69.66.168&cp=QVNKU0NfVVNQQ1hOOndia3hJamR2RHBUNG5aWUt3czl5UjhkZUJsNDJGaDF2M0JnZi14dm9tWFA&id=e9c23dbe6b447244&itag=22&source=webdrive&requiressl=yes&mm=30&mn=sn-i3belnez&ms=nxu&mv=m&pl=24&ttl=transient&susc=dr","type":"video\/mp4","duration":"5326.378"},{"qualify":"480p","src":"https:\/\/redirector.googlevideo.com\/videoplayback?expire=1551276322&ei=4mB2XMLVHYXWugKi0axI&ip=118.69.66.168&cp=QVNKU0NfVVNQQ1hOOndia3hJamR2RHBUNG5aWUt3czl5UjhkZUJsNDJGaDF2M0JnZi14dm9tWFA&id=e9c23dbe6b447244&itag=59&source=webdrive&requiressl=yes&mm=30&mn=sn-i3belnez&ms=nxu&mv=m&pl=24&ttl=transient&susc=dr","type":"video\/mp4","duration":"5326.378"}]',
    		'ad_id' => 1,
    	]]);
    }
}
