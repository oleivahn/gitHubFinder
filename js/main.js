$(document).ready(function(){
    console.log('Ready...');
    
    $('#searchUser').on('keyup', function(e){
        // console.log('key pressed');
        // console.log(e.target.value);
        let username = e.target.value;

        //Make request to GitHub
        $.ajax({
            url: 'https://api.github.com/users/'+username,
            data: {
                client_id: '8d690834e2d956681cc0',
                client_secret: 'd5f82785fb97668917020abbc7fc849cee9fde67'
            }
        }).done(function(user){
            $.ajax({
                url: 'https://api.github.com/users/'+username+'/repos',
                data: {
                    client_id: '8d690834e2d956681cc0',
                    client_secret: 'd5f82785fb97668917020abbc7fc849cee9fde67',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                // console.log(repos)
                $.each(repos, function(index, repo){
                    $('#repos').append(`
                        <div class='card-header'>
                            <div class='row'>
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong> ${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                                    <span class="badge badge-danger">Watchers: ${repo.watchers_count}</span>
                                    <span class="badge badge-warning">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target='_target' class='btn btn-info btn-block'>Repo Page</a>
                                </div>
                            </div>
                        </div>
                    `);
                })
            });
            console.log(user);
            $('#profile').html(` 
            <div class="card">
                <div class="card-header">
                ${user.name}
                </div>
                <div class="card-body">
                   <div class='row'>
                        <div class='col-md-3'>
                            <img class='thumbnail avatar' src="${user.avatar_url}">
                            <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">Go to profile</a>
                        </div>
                        <div class='col-md-9'>
                            <span class="badge badge-success">Public Repos: ${user.public_repos}</span>
                            <span class="badge badge-danger">Public Gists: ${user.public_gists}</span>
                            <span class="badge badge-warning">Followers: ${user.followers}</span>
                            <span class="badge badge-info">Following: ${user.following}</span>
                            <br><br>
                            <ul class="list-group">
                                <li class="list-group-item"> Company: ${user.company}</li>
                                <li class="list-group-item"> Website: ${user.blog}</li>
                                <li class="list-group-item"> Location: ${user.location}</li>
                                <li class="list-group-item"> Member Since: ${user.created_at}</li>
                            </ul>
                        </div>
                   </div>
                </div>
            </div>
            <h3 class="page-header">Latest Repos</h3>
            <div id="repos">

            </div>
            `)
        });
    });
});