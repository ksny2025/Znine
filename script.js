var SB_URL = "https://njakbxadbnxcfboosuki.supabase.co";
var SB_PUB = "sb_publishable_833cToT_nTGdqVtBsC2QMQ_28Hy1tqZ";

window.T = window.T || function(s) { return s; };

(function() {
    var bgLayer = document.createElement('div');
    bgLayer.className = 'aurora-bg';
    bgLayer.innerHTML =
        '<div class="aurora-orb orb-1"></div>' +
        '<div class="aurora-orb orb-2"></div>' +
        '<div class="aurora-orb orb-3"></div>';
    document.body.appendChild(bgLayer);

    var gridLayer = document.createElement('div');
    gridLayer.className = 'grid-overlay';
    document.body.appendChild(gridLayer);

    var svgLayer = document.createElement('div');
    svgLayer.innerHTML = '<svg width="0" height="0" style="position:absolute"><defs><filter id="liquidDrop" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency="0.011 0.017" numOctaves="2" seed="7" result="noise"/><feGaussianBlur in="noise" stdDeviation="1.6" result="softNoise"/><feDisplacementMap in="SourceGraphic" in2="softNoise" scale="90" xChannelSelector="R" yChannelSelector="G"/></filter></defs></svg>';
    document.body.appendChild(svgLayer);

    var isTouch = window.matchMedia('(hover: none)').matches;

    var navItems = document.querySelectorAll('.nav-item');
    var slider = document.getElementById('navSlider');
    var pages = {
        home: document.getElementById('home-page'),
        download: document.getElementById('download-page'),
        announcement: document.getElementById('announcement-page'),
        chat: document.getElementById('chat-page'),
        about: document.getElementById('about-page')
    };

    var sliderInitialized = false;
    function updateSliderPosition(activeBtn) {
        if (!slider || !activeBtn) return;
        slider.style.left = (activeBtn.offsetLeft - 5) + 'px';
        slider.style.width = (activeBtn.offsetWidth + 10) + 'px';
        if (sliderInitialized) {
            slider.classList.remove('morphing');
            slider.offsetHeight;
            slider.classList.add('morphing');
        }
        sliderInitialized = true;
    }

    function revealInPage(pageEl) {
        if (!pageEl) return;
        var items = pageEl.querySelectorAll('.reveal');
        items.forEach(function(el) {
            el.classList.remove('in-view');
        });
        requestAnimationFrame(function() {
            items.forEach(function(el, i) {
                setTimeout(function() {
                    el.classList.add('in-view');
                }, 60 + i * 55);
            });
        });
    }

    function switchPage(pageId, clickedBtn) {
        for (var key in pages) {
            if (pages[key]) pages[key].classList.remove('active-page');
        }
        var targetPage = pages[pageId];
        if (targetPage) {
            targetPage.style.animation = 'none';
            targetPage.offsetHeight;
            targetPage.classList.add('active-page');
            revealInPage(targetPage);
        }
        navItems.forEach(function(btn) {
            btn.classList.remove('active');
        });
        if (clickedBtn) clickedBtn.classList.add('active');
        updateSliderPosition(clickedBtn);
        var main = document.querySelector('.main-content');
        if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navItems.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var pageTarget = btn.getAttribute('data-page');
            if (pageTarget && pages[pageTarget]) {
                switchPage(pageTarget, btn);
            }
        });
    });

    var initialActive = document.querySelector('.nav-item.active');
    if (initialActive) updateSliderPosition(initialActive);
    window.addEventListener('resize', function() {
        var currentActive = document.querySelector('.nav-item.active');
        if (currentActive) updateSliderPosition(currentActive);
    });

    var subElem = document.querySelector('#home-page .home-sub');
    if (subElem) {
        var originalSub = subElem.innerText;
        setTimeout(function() {
            subElem.innerText = T('长途旅行小助手（他能为你的长途旅行添加模组！）');
            subElem.classList.add('fade-in');
            setTimeout(function() { subElem.classList.remove('fade-in'); }, 700);
        }, 600);
        setTimeout(function() {
            subElem.innerText = T(originalSub);
            subElem.classList.add('fade-in');
            setTimeout(function() { subElem.classList.remove('fade-in'); }, 700);
        }, 6200);
        setTimeout(function() {
            subElem.innerText = T('模组加载 | 助手工具 ');
            subElem.classList.add('fade-in');
            setTimeout(function() { subElem.classList.remove('fade-in'); }, 700);
        }, 9800);
    }

    var imgContainers = document.querySelectorAll('.software-img');
    imgContainers.forEach(function(container) {
        container.addEventListener('click', function(e) {
            e.stopPropagation();
            var imgElement = container.querySelector('img');
            if (imgElement && imgElement.src) {
                window.open(imgElement.src, '_blank');
            } else {
                var fallbackSrc = container.getAttribute('data-img-src');
                if (fallbackSrc) window.open(fallbackSrc, '_blank');
            }
        });
    });

    var cards = document.querySelectorAll('.software-card');

    if (typeof IntersectionObserver !== 'undefined') {
        var io = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    entry.target.style.transitionDelay = '';
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, root: document.querySelector('.main-content') });
        document.querySelectorAll('.reveal').forEach(function(el) {
            io.observe(el);
        });

        var cardObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.transform = '';
                    entry.target.classList.remove('rising');
                    entry.target.offsetHeight;
                    entry.target.classList.add('rising');
                } else {
                    entry.target.style.transform = '';
                    entry.target.classList.remove('rising');
                }
            });
        }, { threshold: 0.15, root: document.querySelector('.main-content') });
        document.querySelectorAll('.software-card').forEach(function(card) {
            cardObserver.observe(card);
        });
    } else {
        document.querySelectorAll('.reveal').forEach(function(el) {
            el.classList.add('in-view');
        });
        document.querySelectorAll('.software-card').forEach(function(card) {
            card.classList.add('rising');
        });
    }

    if (!isTouch) {
        cards.forEach(function(card) {
            var img = card.querySelector('.software-img');
            card.addEventListener('mousemove', function(e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var px = x / rect.width;
                var py = y / rect.height;
                var rx = (py - 0.5) * -8;
                var ry = (px - 0.5) * 10;
                card.style.transform =
                    'translateY(-6px) perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
                if (img) {
                    img.style.setProperty('--mx', (px * 100) + '%');
                    img.style.setProperty('--my', (py * 100) + '%');
                }
                card.style.setProperty('--mx', (px * 100) + '%');
                card.style.setProperty('--my', (py * 100) + '%');
            });
            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
            });
        });
    }

    var homeBtns = document.querySelectorAll('#home-page .social-btn, #about-page .group-btn');
    homeBtns.forEach(function(btn) {
        btn.addEventListener('mousemove', function(e) {
            var rect = btn.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.25 - 2) + 'px)';
        });
        btn.addEventListener('mouseleave', function() {
            btn.style.transform = '';
        });
    });

    var initialPage = document.querySelector('.page-view.active-page');
    if (initialPage) revealInPage(initialPage);
})();

(function() {
    var authPane = document.getElementById('authPane');
    var chatPane = document.getElementById('chatPane');
    if (!authPane || !chatPane) return;

    var loginForm = document.getElementById('loginForm');
    var authError = document.getElementById('authError');
    var chatMessages = document.getElementById('chatMessages');
    var chatForm = document.getElementById('chatForm');
    var chatInput = document.getElementById('chatInput');
    var accountInfo = document.getElementById('accountInfo');
    var logoutBtn = document.getElementById('logoutBtn');
    var changePwdBtn = document.getElementById('changePwdBtn');
    var changePwdForm = document.getElementById('changePwdForm');

    var pollTimer = null;
    var deletedCache = {};
    var usersCache = {};
    var toastTimer = null;

    function toast(msg) {
        var el = document.getElementById('cloudToast');
        if (!el) {
            el = document.createElement('div');
            el.id = 'cloudToast';
            el.className = 'cloud-toast';
            document.body.appendChild(el);
        }
        el.textContent = msg;
        el.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function() { el.classList.remove('show'); }, 3500);
    }

    function myEmail() {
        return localStorage.getItem('cloud_email') || '';
    }

    function myName() {
        return localStorage.getItem('chat_username') || '';
    }

    function isAdmin() {
        return localStorage.getItem('chat_admin') === '1';
    }

    function setAuthVisible(showAuth) {
        authPane.style.display = showAuth ? '' : 'none';
        chatPane.style.display = showAuth ? 'none' : 'flex';
        if (!showAuth) {
            startPolling();
        } else {
            stopPolling();
        }
    }

    function showError(msg) {
        authError.textContent = msg || '';
    }

    function genId() {
        return 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    }

    function bytesToHex(buf) {
        return Array.from(new Uint8Array(buf)).map(function(b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    }

    function pbkdf2(password, saltHex) {
        var enc = new TextEncoder();
        return crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
            .then(function(key) {
                return crypto.subtle.deriveBits({
                    name: 'PBKDF2',
                    hash: 'SHA-256',
                    salt: enc.encode(saltHex),
                    iterations: 60000
                }, key, 256);
            })
            .then(bytesToHex);
    }

    function sbFetchRetry(url, opts, tries) {
        tries = tries || 0;
        return fetch(url, opts).catch(function(err) {
            if (tries >= 4) throw err;
            var delays = [1500, 3000, 5000, 8000];
            return new Promise(function(res) { setTimeout(res, delays[tries]); })
                .then(function() { return sbFetchRetry(url, opts, tries + 1); });
        });
    }

    function sbGet(path) {
        return sbFetchRetry(SB_URL + '/rest/v1/' + path, {
            headers: { 'apikey': SB_PUB }
        }).then(function(res) {
            return res.json().then(function(data) {
                return { ok: res.ok, status: res.status, data: data };
            });
        });
    }

    function sbPost(table, body, ignoreDup) {
        return sbFetchRetry(SB_URL + '/rest/v1/' + table, {
            method: 'POST',
            headers: {
                'apikey': SB_PUB,
                'Content-Type': 'application/json',
                'Prefer': ignoreDup ? 'resolution=ignore-duplicates,return=minimal' : 'return=minimal'
            },
            body: JSON.stringify(body)
        }).then(function(res) {
            if (res.ok) return { ok: true };
            return res.json().then(function(err) {
                return { ok: false, status: res.status, error: err };
            });
        });
    }

    function sbDelete(path) {
        return sbFetchRetry(SB_URL + '/rest/v1/' + path, {
            method: 'DELETE',
            headers: { 'apikey': SB_PUB }
        }).then(function(res) {
            return { ok: res.ok };
        });
    }

    function sbRpc(fn, body) {
        return sbFetchRetry(SB_URL + '/rest/v1/rpc/' + fn, {
            method: 'POST',
            headers: { 'apikey': SB_PUB, 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(function(res) { return res.json(); });
    }

    function avatarFileToUrl(fname) {
        if (!fname) return '';
        return SB_URL + '/storage/v1/object/public/avatars/' + fname;
    }

    function loadDeleted() {
        return sbGet('deleted_ids?select=id&order=time.desc&limit=2000').then(function(res) {
            if (res.ok && Array.isArray(res.data)) {
                deletedCache = {};
                res.data.forEach(function(r) { deletedCache[r.id] = true; });
            }
        });
    }

    function loadUsers() {
        return sbGet('users?select=username,is_admin,avatar_file&limit=500').then(function(res) {
            usersCache = {};
            if (res.ok && Array.isArray(res.data)) {
                res.data.forEach(function(u) { usersCache[u.username] = u; });
            }
        });
    }

    function bindEmailCheck(inputId, hintId, allow) {
        var input = document.getElementById(inputId);
        var hint = document.getElementById(hintId);
        if (!input || !hint) return;
        input.addEventListener('input', function() {
            var v = input.value.trim();
            var bad = v.length > 0 && !(allow && allow.indexOf(v) !== -1) && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
            hint.classList.toggle('show', bad);
            input.classList.toggle('input-error', bad);
        });
    }

    bindEmailCheck('loginEmail', 'loginEmailHint', ['BENBAIJIE']);

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showError('');
        var acct = document.getElementById('loginEmail').value.trim();
        var password = document.getElementById('loginPassword').value;
        var lookup;
        if (acct === 'BENBAIJIE') {
            lookup = sbGet('users?username=eq.BENBAIJIE&select=email,username,salt,hash,is_admin&limit=1');
        } else {
            lookup = sbGet('users?email=eq.' + encodeURIComponent(acct.toLowerCase()) + '&select=email,username,salt,hash,is_admin&limit=1');
        }
        lookup.then(function(res) {
            if (!res.ok || !Array.isArray(res.data) || !res.data.length) {
                showError('邮箱或密码错误');
                return;
            }
            var user = res.data[0];
            pbkdf2(password, user.salt).then(function(hash) {
                if (hash !== user.hash) {
                    showError('邮箱或密码错误');
                    return;
                }
                localStorage.setItem('cloud_email', user.email);
                localStorage.setItem('chat_username', user.username);
                localStorage.setItem('chat_admin', user.is_admin ? '1' : '0');
                enterChat(user.username);
            }).catch(function() { showError('登录失败，请重试'); });
        }).catch(function() {
            showError('无法连接服务器，请重试');
        });
    });

    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('cloud_email');
        localStorage.removeItem('chat_username');
        localStorage.removeItem('chat_admin');
        setAuthVisible(true);
    });

    changePwdBtn.addEventListener('click', function() {
        var showing = changePwdForm.style.display !== 'none';
        changePwdForm.style.display = showing ? 'none' : 'flex';
    });

    function enterChat(username) {
        accountInfo.textContent = T('当前账号：') + username + (isAdmin() ? T('（管理员）') : '');
        setAuthVisible(false);
        chatMessages.innerHTML = '';
        refreshAll();
        loadProfile();
    }

    function escapeHtml(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function avatarHtml(url, name) {
        if (url) return '<img class="avatar" src="' + url + '" alt="">';
        return '<span class="avatar avatar-letter">' + escapeHtml((name || '?').charAt(0).toUpperCase()) + '</span>';
    }

    function formatTime(ts) {
        var d = new Date(ts * 1000);
        function pad(n) { return n < 10 ? '0' + n : '' + n; }
        return pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
    }

    function isNearBottom() {
        return chatMessages.scrollHeight - chatMessages.scrollTop - chatMessages.clientHeight < 80;
    }

    function renderMessages(list) {
        var curName = myName();
        var stick = isNearBottom();
        var empty = chatMessages.querySelector('.chat-empty');
        if (empty) empty.remove();
        list.forEach(function(m) {
            if (deletedCache[m.id]) return;
            if (chatMessages.querySelector('[data-id="' + m.id + '"]')) return;
            var u = usersCache[m.username] || {};
            var item = document.createElement('div');
            item.className = 'chat-msg' + (m.username === curName ? ' mine' : '');
            item.setAttribute('data-id', m.id);
            var meta = '<div class="chat-msg-meta">' + avatarHtml(avatarFileToUrl(u.avatar_file), m.username) + '<span class="chat-msg-name">' + escapeHtml(m.username) + '</span>';
            if (u.is_admin) meta += '<span class="admin-badge">管理员</span>';
            meta += ' · ' + formatTime(m.time);
            meta += '</div>';
            item.innerHTML = meta + '<div class="chat-msg-bubble">' + escapeHtml(m.content) + '</div>';
            chatMessages.appendChild(item);
        });
        if (stick) chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function refreshMessages() {
        sbGet('messages?select=id,username,content,time&order=time.asc&limit=500').then(function(res) {
            if (!res.ok || !Array.isArray(res.data)) return;
            var list = res.data.filter(function(m) { return !deletedCache[m.id]; });
            if (!list.length && !chatMessages.children.length) {
                chatMessages.innerHTML = '<div class="chat-empty">还没有消息，来发第一条吧！</div>';
            } else {
                renderMessages(list);
            }
        }).catch(function() {});
    }

    function refreshAll() {
        loadDeleted().then(loadUsers).then(function() {
            refreshMessages();
        }).catch(function() {});
    }

    function startPolling() {
        stopPolling();
        pollTimer = setInterval(function() {
            if (document.getElementById('chat-page').classList.contains('active-page')) {
                refreshAll();
            }
        }, 3000);
    }

    function stopPolling() {
        if (pollTimer) {
            clearInterval(pollTimer);
            pollTimer = null;
        }
    }

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var content = chatInput.value.trim();
        if (!content) return;
        chatInput.value = '';
        var msg = {
            id: genId(),
            email: myEmail(),
            username: myName(),
            content: content,
            time: Math.floor(Date.now() / 1000)
        };
        sbPost('messages', msg).then(function(res) {
            if (res.ok) {
                renderMessages([msg]);
            } else {
                chatInput.value = content;
                toast('发送失败，请重试');
            }
        }).catch(function() {
            chatInput.value = content;
            toast('网络不佳，发送失败，请重试');
        });
        chatInput.focus();
    });

    var tabChat = document.getElementById('tabChat');
    var tabForum = document.getElementById('tabForum');
    var chatView = document.getElementById('chatView');
    var forumView = document.getElementById('forumView');
    var forumList = document.getElementById('forumList');
    var forumSearch = document.getElementById('forumSearch');
    var postForm = document.getElementById('postForm');
    var postDetail = document.getElementById('postDetail');
    var newPostBtn = document.getElementById('newPostBtn');
    var postsCache = [];

    newPostBtn.addEventListener('click', function() {
        postForm.style.display = postForm.style.display === 'none' ? 'flex' : 'none';
    });

    document.getElementById('cancelPostBtn').addEventListener('click', function() {
        postForm.style.display = 'none';
    });

    tabChat.addEventListener('click', function() {
        tabChat.classList.add('active');
        tabForum.classList.remove('active');
        chatView.style.display = '';
        forumView.style.display = 'none';
    });

    tabForum.addEventListener('click', function() {
        tabForum.classList.add('active');
        tabChat.classList.remove('active');
        forumView.style.display = '';
        chatView.style.display = 'none';
        backToList();
        refreshForum();
    });

    var searchTimer = null;
    forumSearch.addEventListener('input', function() {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(renderSearch, 400);
    });

    function renderSearch() {
        renderPosts(postsCache);
    }

    function matchesSearch(p) {
        var q = forumSearch.value.trim().toLowerCase();
        if (!q) return true;
        return p.title.toLowerCase().indexOf(q) !== -1 ||
            p.content.toLowerCase().indexOf(q) !== -1 ||
            p.username.toLowerCase().indexOf(q) !== -1 ||
            (p.tags || []).some(function(t) { return t.toLowerCase().indexOf(q) !== -1; });
    }

    function refreshForum(reopenId) {
        Promise.all([
            sbGet('posts?select=id,email,username,title,content,tags,time&order=time.asc&limit=500'),
            sbGet('replies?select=id,post_id,email,username,content,time&order=time.asc&limit=2000'),
            sbGet('post_likes?select=post_id,email&limit=5000'),
            sbGet('follows?select=follower,followee&limit=5000')
        ]).then(function(results) {
            var posts = results[0].ok && Array.isArray(results[0].data) ? results[0].data : [];
            var replies = results[1].ok && Array.isArray(results[1].data) ? results[1].data : [];
            var likes = results[2].ok && Array.isArray(results[2].data) ? results[2].data : [];
            var follows = results[3].ok && Array.isArray(results[3].data) ? results[3].data : [];
            var me = myEmail();
            var followerCounts = {};
            follows.forEach(function(f) {
                followerCounts[f.followee] = (followerCounts[f.followee] || 0) + 1;
            });
            var myFollowing = {};
            follows.forEach(function(f) {
                if (f.follower === me) myFollowing[f.followee] = true;
            });
            postsCache = posts.filter(function(p) { return !deletedCache[p.id]; }).reverse().map(function(p) {
                var author = usersCache[p.username] || {};
                var postLikes = likes.filter(function(l) { return l.post_id === p.id; });
                var postReplies = replies.filter(function(r) { return r.post_id === p.id; });
                return {
                    id: p.id,
                    email: p.email,
                    username: p.username,
                    avatar: avatarFileToUrl(author.avatar_file),
                    title: p.title,
                    content: p.content,
                    tags: p.tags || [],
                    time: p.time,
                    likes: postLikes.length,
                    liked: postLikes.some(function(l) { return l.email === me; }),
                    followers: followerCounts[p.email] || 0,
                    following: !!myFollowing[p.email],
                    is_own: p.email === me,
                    replies: postReplies.map(function(r) {
                        var ru = usersCache[r.username] || {};
                        return {
                            id: r.id,
                            username: r.username,
                            avatar: avatarFileToUrl(ru.avatar_file),
                            content: r.content,
                            time: r.time
                        };
                    })
                };
            });
            renderPosts(postsCache);
            if (reopenId) openPost(reopenId);
        }).catch(function() {});
    }

    function renderPosts(posts) {
        var visible = posts.filter(matchesSearch);
        if (!visible.length) {
            forumList.innerHTML = '<div class="forum-empty">' + T('没有找到相关帖子') + '</div>';
            return;
        }
        forumList.innerHTML = visible.map(function(p) {
            var t = tagsHtml(p.tags);
            return '<div class="post-row" data-id="' + p.id + '">' +
                '<span class="post-row-icon">📄</span>' +
                '<span class="post-row-title">' + escapeHtml(p.title) + '</span>' +
                '<span class="post-row-tags">' + t + '</span>' +
                '<span class="post-row-counts">❤ ' + p.likes + T(' · 回复 ') + p.replies.length + '</span>' +
                '<span class="post-row-meta">' + formatTime(p.time) + ' · ' + escapeHtml(p.username) + '</span>' +
                '</div>';
        }).join('');
        forumList.querySelectorAll('.tag-chip').forEach(function(el) { el.addEventListener('click', tagClick); });
    }

    function openPost(id) {
        var p = postsCache.find(function(x) { return x.id === id; });
        if (!p) return;
        var h = '<button type="button" class="f-btn f-back" id="backToList">' + T('← 返回列表') + '</button>';
        h += '<div class="post" data-id="' + p.id + '">';
        h += '<div class="post-head">' + avatarHtml(p.avatar, p.username) + '<span class="post-name">' + escapeHtml(p.username) + '</span>';
        h += '<span class="post-followers">' + p.followers + T(' 粉丝') + '</span>';
        if (!p.is_own) h += '<button type="button" class="f-btn f-follow' + (p.following ? ' following' : '') + '" data-email="' + escapeHtml(p.email) + '">' + (p.following ? T('已关注') : T('+ 关注')) + '</button>';
        h += '<span class="post-time">' + formatTime(p.time) + '</span></div>';
        h += '<div class="post-title">' + escapeHtml(p.title) + '</div>';
        if (p.tags && p.tags.length) h += '<div class="post-tags">' + tagsHtml(p.tags) + '</div>';
        h += '<div class="post-content">' + escapeHtml(p.content) + '</div>';
        h += '<div class="post-actions">';
        h += '<button type="button" class="f-btn f-like' + (p.liked ? ' liked' : '') + '">' + (p.liked ? '❤' : '♡') + ' ' + p.likes + '</button>';
        h += '<span class="post-followers">' + p.replies.length + T(' 条回复') + '</span>';
        h += '</div>';
        h += '<div class="post-replies">';
        p.replies.forEach(function(r) {
            h += '<div class="reply"><div class="reply-head">' + avatarHtml(r.avatar, r.username) + '<span class="reply-name">' + escapeHtml(r.username) + '</span><span>' + formatTime(r.time) + '</span></div><div class="reply-content">' + escapeHtml(r.content) + '</div></div>';
        });
        h += '<form class="reply-form"><input type="text" placeholder="' + T('写下你的回复...') + '" maxlength="500" required><button type="submit" class="f-btn">' + T('回复') + '</button></form>';
        h += '</div></div>';
        forumList.style.display = 'none';
        postForm.style.display = 'none';
        postDetail.innerHTML = h;
        postDetail.style.display = '';
        postDetail.querySelectorAll('.tag-chip').forEach(function(el) { el.addEventListener('click', tagClick); });
    }

    function backToList() {
        postDetail.style.display = 'none';
        postDetail.innerHTML = '';
        forumList.style.display = '';
    }

    function tagsHtml(tags) {
        if (!tags || !tags.length) return '';
        return tags.map(function(t) {
            return '<span class="tag-chip" data-tag="' + escapeHtml(t) + '">#' + escapeHtml(t) + '</span>';
        }).join('');
    }

    function tagClick(e) {
        var chip = e.target.closest('.tag-chip');
        if (!chip) return;
        e.stopPropagation();
        forumSearch.value = chip.getAttribute('data-tag');
        backToList();
        renderSearch();
    }

    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var title = document.getElementById('postTitle').value.trim();
        var content = document.getElementById('postContent').value.trim();
        var tagsRaw = document.getElementById('postTags').value;
        if (!title || !content) return;
        var tags = [];
        tagsRaw.split(/[,，、\s]+/).forEach(function(t) {
            t = t.replace(/^#/, '').slice(0, 12);
            if (t && tags.indexOf(t) === -1 && tags.length < 5) tags.push(t);
        });
        var post = {
            id: genId(),
            email: myEmail(),
            username: myName(),
            title: title,
            content: content,
            tags: tags,
            time: Math.floor(Date.now() / 1000)
        };
        sbPost('posts', post).then(function(res) {
            if (res.ok) {
                postForm.reset();
                postForm.style.display = 'none';
                refreshForum(post.id);
                loadProfile();
            } else {
                var m = (res.error && res.error.message) || '';
                toast(m.indexOf('duplicate') !== -1 ? '标题重复或数据冲突，换个标题试试' : '发布失败，请重试');
            }
        }).catch(function() {
            toast('网络不佳，发布失败，请重试');
        });
    });

    forumView.addEventListener('click', function(e) {
        if (e.target.closest('#backToList')) {
            backToList();
            return;
        }
        var postEl = e.target.closest('.post');
        if (postEl) {
            var id = postEl.getAttribute('data-id');
            var likeBtn = e.target.closest('.f-like');
            if (likeBtn) {
                var me = myEmail();
                var wasLiked = likeBtn.classList.contains('liked');
                var toggle = wasLiked
                    ? sbDelete('post_likes?post_id=eq.' + id + '&email=eq.' + encodeURIComponent(me))
                    : sbPost('post_likes', { post_id: id, email: me });
                toggle.then(function(res) {
                    if (!res.ok) { toast('操作失败，请重试'); return; }
                    var cur = postsCache.find(function(x) { return x.id === id; });
                    var count = cur ? cur.likes : 0;
                    count = wasLiked ? Math.max(0, count - 1) : count + 1;
                    likeBtn.classList.toggle('liked', !wasLiked);
                    likeBtn.textContent = (wasLiked ? '♡ ' : '❤ ') + count;
                    if (cur) cur.liked = !wasLiked;
                }).catch(function() { toast('网络不佳，操作失败'); });
                return;
            }
            var followBtn = e.target.closest('.f-follow');
            if (followBtn) {
                var target = followBtn.getAttribute('data-email');
                var wasFollowing = followBtn.classList.contains('following');
                var ftoggle = wasFollowing
                    ? sbDelete('follows?follower=eq.' + encodeURIComponent(myEmail()) + '&followee=eq.' + encodeURIComponent(target))
                    : sbPost('follows', { follower: myEmail(), followee: target });
                ftoggle.then(function(res) {
                    if (!res.ok) { toast('操作失败，请重试'); return; }
                    followBtn.classList.toggle('following', !wasFollowing);
                    followBtn.textContent = wasFollowing ? '+ 关注' : '已关注';
                    var f = postEl.querySelector('.post-followers');
                    if (f) f.textContent = (parseInt(f.textContent, 10) || 0) + (wasFollowing ? -1 : 1) + ' 粉丝';
                    loadProfile();
                }).catch(function() { toast('网络不佳，操作失败'); });
                return;
            }
            return;
        }
        var row = e.target.closest('.post-row');
        if (row) openPost(row.getAttribute('data-id'));
    });

    forumView.addEventListener('submit', function(e) {
        var form = e.target.closest('.reply-form');
        if (!form) return;
        e.preventDefault();
        var postEl = form.closest('.post');
        var input = form.querySelector('input');
        var content = input.value.trim();
        if (!content) return;
        var pid = postEl.getAttribute('data-id');
        var reply = {
            id: genId(),
            post_id: pid,
            email: myEmail(),
            username: myName(),
            content: content,
            time: Math.floor(Date.now() / 1000)
        };
        sbPost('replies', reply).then(function(res) {
            if (res.ok) {
                refreshForum(pid);
            } else {
                toast('回复失败，请重试');
            }
        }).catch(function() { toast('网络不佳，回复失败，请重试'); });
    });

    function setMyAvatar(url) {
        var el = document.getElementById('myAvatar');
        if (!el) return;
        var name = myName() || '?';
        if (url) {
            el.outerHTML = '<img class="avatar avatar-lg" id="myAvatar" src="' + url + '?t=' + Date.now() + '" alt="">';
        } else {
            el.textContent = name.charAt(0).toUpperCase();
        }
    }

    function loadProfile() {
        var me = myEmail();
        if (!me) return;
        Promise.all([
            sbGet('follows?follower=eq.' + encodeURIComponent(me) + '&select=followee'),
            sbGet('follows?followee=eq.' + encodeURIComponent(me) + '&select=follower'),
            sbGet('posts?email=eq.' + encodeURIComponent(me) + '&select=id')
        ]).then(function(results) {
            var following = results[0].ok && Array.isArray(results[0].data) ? results[0].data.length : 0;
            var followers = results[1].ok && Array.isArray(results[1].data) ? results[1].data.length : 0;
            var posts = results[2].ok && Array.isArray(results[2].data) ? results[2].data.length : 0;
            var statsEl = document.getElementById('accountStats');
            if (statsEl) statsEl.textContent = T('关注 ') + following + T(' · 粉丝 ') + followers + T(' · 发帖 ') + posts;
            setMyAvatar(avatarFileToUrl((usersCache[myName()] || {}).avatar_file));
        }).catch(function() {});
    }

    var annList = document.getElementById('annList');
    var annForm = document.getElementById('annForm');

    function formatDate(ts) {
        var d = new Date(ts * 1000);
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }

    function loadAnnouncements() {
        if (!annList) return;
        sbGet('announcements?select=id,title,content,author,time&order=time.desc&limit=100').then(function(res) {
            if (!res.ok || !Array.isArray(res.data)) return;
            var list = res.data.filter(function(a) { return !deletedCache[a.id]; });
            annList.innerHTML = list.map(function(a) {
                var h = '<div class="announcement-item">';
                h += '<div class="announcement-title">' + escapeHtml(a.title) + '</div>';
                h += '<div class="announcement-meta"><span>' + T('日期 ') + formatDate(a.time) + '</span><span>' + T('作者 ') + escapeHtml(a.author) + '</span></div>';
                h += '<div class="announcement-content">' + escapeHtml(a.content) + '</div>';
                return h + '</div>';
            }).join('');
            annList.querySelectorAll('.announcement-item').forEach(function(item, idx) {
                item.classList.add('reveal', 'in-view');
                item.style.transitionDelay = idx * 70 + 'ms';
            });
        }).catch(function() {});
    }

    document.querySelectorAll('.nav-item').forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (btn.getAttribute('data-page') === 'announcement') loadAnnouncements();
        });
    });

    window.addEventListener('langchange', function() {
        loadAnnouncements();
        if (myEmail()) {
            renderPosts(postsCache);
            var name = myName();
            if (name) accountInfo.textContent = T('当前账号：') + name + (isAdmin() ? T('（管理员）') : '');
        }
    });

    loadAnnouncements();

    if (myEmail()) {
        enterChat(myName());
    }
})();

(function() {
    var cid = localStorage.getItem('site_cid');
    if (!cid) {
        cid = 'c' + Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem('site_cid', cid);
    }

    var statTotal = document.getElementById('statTotal');
    var statToday = document.getElementById('statToday');
    var statOnline = document.getElementById('statOnline');

    var countSpans = [];
    document.querySelectorAll('.software-card').forEach(function(card) {
        var nameEl = card.querySelector('.software-name');
        var meta = card.querySelector('.version-meta');
        if (!nameEl || !meta) return;
        var span = document.createElement('span');
        span.className = 'dl-count';
        span.setAttribute('data-soft', nameEl.textContent.trim());
        span.textContent = ' · 下载 0 次';
        meta.appendChild(span);
        countSpans.push(span);
    });

    function fetchRetry(url, opts, tries) {
        tries = tries || 0;
        return fetch(url, opts).catch(function(err) {
            if (tries >= 4) throw err;
            var delays = [1500, 3000, 5000, 8000];
            return new Promise(function(res) { setTimeout(res, delays[tries]); })
                .then(function() { return fetchRetry(url, opts, tries + 1); });
        });
    }

    function updateAll(stats, downloads) {
        if (statTotal) statTotal.textContent = stats.total;
        if (statToday) statToday.textContent = stats.today;
        if (statOnline) statOnline.textContent = stats.online;
        countSpans.forEach(function(span) {
            var n = downloads[span.getAttribute('data-soft')] || 0;
            span.textContent = T(' · 下载 ') + n + T(' 次');
        });
    }

    function ping() {
        Promise.all([
            fetchRetry(SB_URL + '/rest/v1/rpc/record_visit', {
                method: 'POST',
                headers: { 'apikey': SB_PUB, 'Content-Type': 'application/json' },
                body: JSON.stringify({ p_client: cid })
            }).then(function(r) { return r.json(); }),
            fetchRetry(SB_URL + '/rest/v1/rpc/get_downloads', {
                method: 'POST',
                headers: { 'apikey': SB_PUB, 'Content-Type': 'application/json' },
                body: '{}'
            }).then(function(r) { return r.json(); })
        ]).then(function(results) {
            updateAll(results[0] || {}, results[1] || {});
        }).catch(function() {});
    }

    ping();
    setInterval(ping, 5000);

    document.querySelectorAll('.software-card .download-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var card = btn.closest('.software-card');
            var nameEl = card ? card.querySelector('.software-name') : null;
            if (!nameEl) return;
            var name = nameEl.textContent.trim();
            fetchRetry(SB_URL + '/rest/v1/rpc/increment_download', {
                method: 'POST',
                headers: { 'apikey': SB_PUB, 'Content-Type': 'application/json' },
                body: JSON.stringify({ p_name: name })
            }).then(function(r) { return r.json(); }).then(function(count) {
                countSpans.forEach(function(span) {
                    if (span.getAttribute('data-soft') === name) {
                        span.textContent = T(' · 下载 ') + count + T(' 次');
                    }
                });
            }).catch(function() {});
        });
    });
})();

(function() {
    var STORE_KEY = 'site_lang';
    var DICT = {
        '主页': 'Home', '下载': 'Download', '公告🔥': 'News🔥', '聊天💬': 'Chat💬',
        '欢迎来到长途旅行下载站！': 'Welcome to the TLD download site!',
        '长途旅行小助手（他能为你的长途旅行添加模组！）': 'TLD Helper (adds mods to your game!)',
        '模组加载 | 助手工具 ': 'Mod Loader | Helper Tools ',
        '主播B站': 'Bilibili', '主播酷安': 'Coolapk', '主播抖音': 'Douyin',
        '软件下载': 'Downloads',
        '提示：网盘是小飞机网盘支持不登录直链下载，并且还不限速，但是我还是建议进群下载，因为群内的消息绝对是最新的！': 'Tip: Feijipan supports direct downloads without login or speed limits, but joining the QQ group is recommended for the latest updates!',
        '最新公告': 'Announcements',
        '登录': 'Login', '注册': 'Register', '忘记密码？': 'Forgot password?', '返回上一步': 'Back',
        '获取验证码': 'Get Code', '账号管理': 'Account', '退出登录': 'Logout',
        '发送': 'Send', '聊天室': 'Chat Room', '论坛': 'Forum', '＋ 发帖': '+ New Post',
        '取消': 'Cancel', '发布': 'Post', '发布公告': 'Publish', '保存修改': 'Save',
        '邮箱格式不正确': 'Invalid email format',
        '上传头像': 'Upload Avatar',
        '关于我们': 'About Us', '进入官方QQ群 (点击跳转)': 'Join official QQ group (click)',
        '网站开放时间: 2026.04.14': 'Online since: 2026.04.14',
        '总访问量': 'Total views', '今日访问': 'Today', '当前在线': 'Online',
        'BENBAIJIELoader注入器': 'BENBAIJIELoader Injector',
        '此软件是集合了多个游戏的加载器，比较实用建议下载这个！基于长途旅行模组加载器改过来的。': 'A loader for multiple games. Recommended! Based on the TLD mod loader.',
        '一键临时ROOT🔥': 'One-click Temp ROOT🔥',
        '该工具可以为iqoovivo手机进行临时ROOT': 'Temporary ROOT for iQOO/vivo phones.',
        '真正的异环': 'Real "Yihuan"',
        '修改异环的画质，使他变得一坨，实现低配电脑畅玩异环（仅此娱乐）': 'Degrades Yihuan graphics so low-end PCs can run it (just for fun).',
        '长途旅行本体🔥': 'The Long Drive (Game)🔥',
        '该版本并不是最新的，但是用来加模组是最好的一个版本。': 'Not the latest version, but the best one for adding mods.',
        '长途旅行小助手🔥': 'TLD Helper🔥',
        '兼容模组加载器、加模组功能、一些小功能，目前没啥好更新的了，已是完全版。': 'Works with the mod loader, adds mods and small features. Final version.',
        '长途旅行模组加载器🔥': 'TLD Mod Loader🔥',
        '用来给长途旅行加载模组的，注意这个软件并不能添加模组。': 'Loads mods for The Long Drive. Note: it cannot add mods by itself.',
        'Assets文件🔥': 'Assets Files🔥',
        'Assets是mod的前置文件，不安装的话将会导致长途旅行模组不完全！': 'Required prerequisite for mods; without it mods will be incomplete!',
        '后室模组加载器': 'Backrooms Mod Loader',
        '由于后室更新了，目前模组是加不了的。': 'Backrooms was updated, so mods cannot be loaded currently.',
        '植物大战僵尸杂交版辅助': 'PvZ Hybrid Helper',
        '自己学习制作的一个辅助，没啥功能。': 'A helper I made while learning; not many features.',
        '长途旅行车间工具': 'TLD Workshop Tool',
        '由熙洛汉化的车间工具，该工具与原版车间工具功能相同，只是汉化了而已。': 'Workshop tool translated by Xiluo; same features as the original, just localized.',
        '森林之子模组加载器': 'Sons of the Forest Mod Loader',
        'BENBAIJIE个人制作，现在东西很少，也是基于长途旅行模组加载器改过来的。': 'Made by BENBAIJIE, few contents yet, based on the TLD mod loader.',
        '森林科技加载': 'Forest Tech Loader',
        '他可以帮你辅助游戏，BENBAIJIE个人制作，基于长途旅行模组加载器改过来的。': 'A game assistant by BENBAIJIE, based on the TLD mod loader.',
        '邮箱': 'Email', '密码': 'Password', '用户名': 'Username', '验证码': 'Code',
        '当前密码': 'Current password', '新密码（至少6位）': 'New password (min 6)',
        '新密码': 'New password', '确认修改': 'Confirm',
        '说点什么...': 'Say something...', '帖子标题': 'Post title',
        '标签（用逗号分隔，最多5个）': 'Tags (comma separated, max 5)',
        '分享点什么...': 'Share something...', '公告标题': 'Title', '公告内容...': 'Content...',
        '搜索帖子标题、内容或作者...': 'Search title, content or author...',
        '写下你的回复...': 'Write a reply...',
        '已关注': 'Following', '+ 关注': '+ Follow', ' 粉丝': ' fans', ' 条回复': ' replies',
        '回复': 'Reply', '删除': 'Delete', '编辑': 'Edit', '← 返回列表': '← Back to list',
        '没有找到相关帖子': 'No posts found', '当前账号：': 'Account: ', '（管理员）': ' (Admin)',
        '日期 ': 'Date ', '作者 ': 'By ', '关注 ': 'Following ', ' · 粉丝 ': ' · Fans ', ' · 发帖 ': ' · Posts ',
        ' · 回复 ': ' · Replies ', ' · 下载 ': ' · ', ' 次': ' downloads',
        '提示：账号与主站通用。头像上传、修改密码、找回密码请到主站操作。': 'Tip: accounts are shared with the main site. Manage avatar, password and recovery there.',
        '注册账号、找回密码请到主站操作': 'Register or reset password on the main site'
    };
    var TEXT_SEL = '.nav-item, .page-title, .social-btn, .software-name, .software-desc, .download-btn, .tip-warning, .home-sub, .group-btn, .auth-tab, .auth-submit, .code-btn, .chat-send, .auth-link, .field-hint, #newPostBtn, #cancelPostBtn, .compose-btns .f-btn, #changePwdBtn, #logoutBtn, .cloud-note';

    window.T = function(s) {
        if ((localStorage.getItem(STORE_KEY) || 'zh') !== 'en') return s;
        return DICT[s] || s;
    };

    function applyLang(lang) {
        localStorage.setItem(STORE_KEY, lang);
        document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
        var toEn = lang === 'en';
        document.querySelectorAll(TEXT_SEL).forEach(function(el) {
            if (!el.dataset.zh) el.dataset.zh = el.textContent;
            var zh = el.dataset.zh;
            el.textContent = toEn ? (DICT[zh] || zh) : zh;
        });
        document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(function(el) {
            if (!el.dataset.zhPh) el.dataset.zhPh = el.getAttribute('placeholder');
            var zh = el.dataset.zhPh;
            el.setAttribute('placeholder', toEn ? (DICT[zh] || zh) : zh);
        });
        document.querySelectorAll('.stat-badge').forEach(function(el) {
            var node = el.firstChild;
            if (!node || node.nodeType !== 3) return;
            if (!el.dataset.zh) el.dataset.zh = node.nodeValue.trim();
            node.nodeValue = (toEn ? (DICT[el.dataset.zh] || el.dataset.zh) : el.dataset.zh) + ' ';
        });
        document.querySelectorAll('.version-meta').forEach(function(el) {
            el.childNodes.forEach(function(node) {
                if (node.nodeType !== 3) return;
                if (!node._zh) node._zh = node.nodeValue;
                node.nodeValue = toEn
                    ? node._zh.replace(/版本/g, 'Ver').replace(/日期/g, 'Date').replace(/大小/g, 'Size').replace(/作者/g, 'By')
                    : node._zh;
            });
        });
        var btn = document.getElementById('langBtn');
        if (btn) btn.textContent = toEn ? '中文' : 'EN';
        window.dispatchEvent(new Event('langchange'));
    }

    var langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', function() {
            applyLang((localStorage.getItem(STORE_KEY) || 'zh') === 'en' ? 'zh' : 'en');
        });
    }
    applyLang(localStorage.getItem(STORE_KEY) || 'zh');
})();
