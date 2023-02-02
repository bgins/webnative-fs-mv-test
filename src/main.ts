import './style.css'
import * as webnative from 'webnative'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Webnative fs.mv test</h1>
    <div class="card">
      <button id="run-test" type="button">Run Test</button>
    </div>
  </div>
`

const testButton = document.querySelector<HTMLButtonElement>('#run-test')

if (testButton) {
  testButton.onclick = runTest
}

async function runTest() {
  const program = await webnative.program({
    namespace: { creator: "bgins", name: "webnative-mv-test" },
    debug: true
  })

  if (program.session) {
    if (program.session.fs) {
      await readContent(program.session.fs)
    } else {
      console.warn("No file system :(")
    }

  } else {
    const username = self.crypto.randomUUID()

    const { success } = await program.auth.register({ username })
    let session = success ? await program.auth.session() : null

    if (session) {
      if (session.fs) {
        await writeAndMoveContent(session.fs)
      } else {
        console.warn("No file system :(")
      }
    }
  }
}

// File system

const dirA = webnative.path.directory("private", "dirA")
const dirB = webnative.path.directory("private", "dirB")
const filePath = webnative.path.file("hello.txt")

async function writeAndMoveContent(fs: webnative.FileSystem) {
  // Write a file to dirA
  console.log("Adding a file to dirA")

  await fs.write(
    webnative.path.combine(dirA, filePath),
    new TextEncoder().encode("👋")
  )
  await fs.publish()

  // Move the file to dirB
  console.log("Moving the file to dirB")

  await fs.mv(
    webnative.path.combine(dirA, filePath),
    webnative.path.combine(dirB, filePath)
  )
  await fs.publish()

  // Read the file from dirB
  const content = new TextDecoder().decode(
    // @ts-ignore
    await fs.read(webnative.path.combine(dirB, filePath))
  )
  console.log("Content in dirB after the move: ", content)
}

async function readContent(fs: webnative.FileSystem) {
  // Read the file from dirB
  const content = new TextDecoder().decode(
    // @ts-ignore
    await fs.read(webnative.path.combine(dirB, filePath))
  )
  console.log("Content in dirB on content check: ", content)
}